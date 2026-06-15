import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  EntityManager,
  EntityTarget,
  FindOptionsWhere,
  In,
  ObjectLiteral,
} from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  Brand,
  Category,
  Country,
  Gender,
  Product,
  ProductTranslation,
  ProductImage,
  ProductVariant,
  AttributeValue,
  VariantAttributeValue,
  ProductAttribute,
  VariantImage,
} from '@/entities';
import { generateSlug } from '@/pipe/generateSlug';
import { QueryDto } from '@/shared/queryDto.dto';
import { CloudinaryService } from '@/services/cloudinary/cloudinary.service';
import { randomUUID } from 'crypto';
import { AttributeValueImage } from '@/entities/attribute_value_images.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectEntityManager() private readonly manager: EntityManager,
    private cloudinaryService: CloudinaryService,
  ) {}

  private async checkExist<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    condition: FindOptionsWhere<T>,
    message: string,
  ) {
    const record = await this.manager.findOne(entity, { where: condition });

    if (!record) {
      throw new BadRequestException(message);
    }

    return record;
  }

  async create(
    createProductDto: CreateProductDto,
    allFiles: Express.Multer.File[],
  ) {
    const existingNamePro = await this.manager.findOne(Product, {
      where: { name: createProductDto.name },
    });
    if (existingNamePro) {
      throw new ConflictException('Tên sản phẩm đã tồn tại');
    }

    const [category, gender, country, brand] = await Promise.all([
      this.checkExist(
        Category,
        { id: Number(createProductDto.category_id) },
        'Không tồn tại category',
      ),
      this.checkExist(
        Gender,
        { id: Number(createProductDto.gender_id) },
        'Không tồn tại gender',
      ),
      this.checkExist(
        Country,
        { id: Number(createProductDto.country_id) },
        'Không tồn tại country',
      ),
      this.checkExist(
        Brand,
        { id: Number(createProductDto.brand_id) },
        'Không tồn tại brand',
      ),
    ]);

    const slug = generateSlug(createProductDto.name);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const productCode = `${category.name}-${random}`;

    const product = this.manager.create(Product, {
      name: createProductDto.name,
      slug,
      description: createProductDto.description,
      category,
      genders: gender,
      countrys: country,
      brand,
      productCode,
      verifyToken: randomUUID(),
    });
    const savedProduct = await this.manager.save(product);

    // ── 1. Upload ảnh chung của product (fieldname = 'images') ──────────────
    const productFiles = allFiles.filter((f) => f.fieldname === 'images');
    let imageThumbnail = '';

    if (productFiles.length > 0) {
      const productImages = await Promise.all(
        productFiles.map(async (file, index) => {
          const result = await this.cloudinaryService.uploadFile(file);
          if (index === 0) imageThumbnail = result.secure_url;

          return this.manager.create(ProductImage, {
            imageUrl: result.secure_url,
            publicId: result.public_id,
            product: savedProduct,
            isMain: index === 0,
          });
        }),
      );
      await this.manager.save(ProductImage, productImages);
    }

    // ── 2. Translations ─────────────────────────────────────────────────────
    if (createProductDto.translations?.length > 0) {
      const translations = createProductDto.translations.map((trans) =>
        this.manager.create(ProductTranslation, {
          ...trans,
          product: savedProduct,
        }),
      );
      await this.manager.save(ProductTranslation, translations);
    }

    // ── 3. Variants + VariantAttributeValues + VariantImages ────────────────
    if (createProductDto.variants?.length > 0) {
      for (const variantDto of createProductDto.variants) {
        const sku = `${savedProduct.productCode}-${randomUUID().slice(0, 8).toUpperCase()}`;

        const variant = this.manager.create(ProductVariant, {
          originalPrice: variantDto.originalPrice,
          stock: variantDto.stock,
          discountPercent: variantDto.discountPercent ?? 0,
          costPrice: variantDto.costPrice,
          weight: variantDto.weight,
          note: variantDto.note,
          product: savedProduct,
          sku,
          imageThumbnail,
        });
        const savedVariant = await this.manager.save(ProductVariant, variant);

        // ── 3a. Gắn attribute_values vào variant ──────────────────────────────
        if (variantDto.attributeValueIds?.length > 0) {
          const attributeValues = await this.manager.find(AttributeValue, {
            where: { id: In(variantDto.attributeValueIds) },
          });

          if (attributeValues.length !== variantDto.attributeValueIds.length) {
            throw new NotFoundException('Một số attribute value không tồn tại');
          }

          // Insert vào bảng trung gian variant_attribute_values
          const variantAttributeValues = attributeValues.map((av) =>
            this.manager.create(VariantAttributeValue, {
              variant: savedVariant, // FK → product_variants.id
              attributeValue: av, // FK → attribute_values.id
            }),
          );
          await this.manager.save(
            VariantAttributeValue,
            variantAttributeValues,
          );
        }

        // ── 3b. Upload ảnh riêng của variant ─────────────────────────────────
        if (variantDto.imageKeys?.length > 0) {
          const variantImageEntities = await Promise.all(
            variantDto.imageKeys.map(async (key, index) => {
              const file = allFiles.find((f) => f.fieldname === key);
              if (!file) return null;

              const result = await this.cloudinaryService.uploadFile(file);

              // Cập nhật thumbnail của variant = ảnh đầu tiên
              if (index === 0) {
                await this.manager.update(ProductVariant, savedVariant.id, {
                  imageThumbnail: result.secure_url,
                });
              }

              return this.manager.create(VariantImage, {
                variant: savedVariant,
                imageUrl: result.secure_url,
                publicId: result.public_id,
                isMain: index === 0,
                sortOrder: index,
              });
            }),
          );

          const validImages = variantImageEntities.filter(
            (img): img is VariantImage => img !== null,
          );
          if (validImages.length > 0) {
            await this.manager.save(VariantImage, validImages);
          }
        }
      }
    }
    return savedProduct;
  }
  async findAll({ page, limit, keyword, sortBy, order }: QueryDto) {
    const qb = this.manager
      .createQueryBuilder(Product, 'products')
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.brand', 'brand')
      .leftJoinAndSelect('products.variants', 'variants')
      .leftJoinAndSelect('variants.images', 'variantImages');

    if (keyword) {
      qb.andWhere(
        `(LOWER(products.name) LIKE :keyword 
        OR LOWER(products.description) LIKE :keyword)`,
        {
          keyword: `%${keyword.toLowerCase()}%`,
        },
      );
    }
    qb.skip((page - 1) * limit).take(limit);

    const allowSortFields = ['name', 'created_at', 'price'];

    if (sortBy && allowSortFields.includes(sortBy)) {
      qb.orderBy(
        `products.${sortBy}`,
        order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
      );
    } else {
      qb.orderBy('products.created_at', 'DESC');
    }

    const [data, total] = await qb.getManyAndCount();
    const result = {
      data,
      meta: {
        total,
        page,
        limit,
        totalPage: Math.ceil(total / limit),
      },
    };

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
