import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EntityManager, EntityTarget, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Brand, Category, Country, Gender, Product, ProductTranslation, ProductImage } from '@/entities';
import { generateSlug } from '@/pipe/generateSlug';
import { QueryDto } from '@/shared/queryDto.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectEntityManager() private readonly manager: EntityManager,

  ) { }


  private async checkExist<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    condition: FindOptionsWhere<T>,
    message: string
  ) {
    const record = await this.manager.findOne(entity, { where: condition });

    if (!record) {
      throw new BadRequestException(message);
    }

    return record;
  }

  async create(createProductDto: CreateProductDto) {

    const existingNamePro = await this.manager.findOne(Product, {
      where: {
        name: createProductDto.name
      }
    })

    if (existingNamePro) {
      throw new ConflictException("Tên sản phẩm đã tồn tại");
    }

    const [category, gender, country, brand] = await Promise.all([
      this.checkExist(Category, { id: createProductDto.category_id }, "Không tồn tại category"),
      this.checkExist(Gender, { id: createProductDto.gender_id }, "Không tồn tại gender"),
      this.checkExist(Country, { id: createProductDto.country_id }, "Không tồn tại country"),
      this.checkExist(Brand, { id: createProductDto.brand_id }, "Không tồn tại brand"),
    ]);

    const slug = generateSlug(createProductDto.name)
    const product = this.manager.create(Product, {
      name: createProductDto.name,
      slug: slug,
      description: createProductDto.description,
      category: category,
      genders: gender,
      countrys: country,
      brand: brand
    })

    const result = await this.manager.save(product)

    if (createProductDto.images.length > 0) {

      const images = createProductDto.images.map((image) => {
        return this.manager.create(ProductImage, {
          ...image,
          product: result
        })
      })

      await this.manager.save(ProductImage, images)

    }

    if (createProductDto.translations.length > 0) {
      const translations = createProductDto.translations.map((trans) => {
        return this.manager.create(ProductTranslation, {
          ...trans,
          product: result
        })
      })

      await this.manager.save(ProductTranslation, translations)
    }

    return result

  }


  async findAll({ page, limit, keyword, sortBy, order }: QueryDto) {

    const qb = this.manager.createQueryBuilder(Product, "products")
    .leftJoinAndSelect('products.images', 'images')
    .leftJoinAndSelect('products.brand', 'brand')
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

    const allowSortFields = ["name", "created_at", "price"];

    if (sortBy && allowSortFields.includes(sortBy)) {
      qb.orderBy(
        `products.${sortBy}`,
        order?.toUpperCase() === "DESC" ? "DESC" : "ASC",
      );
    } else {
      qb.orderBy("products.created_at", "DESC");
    }

    const [data, total] = await qb.getManyAndCount();
    const result = {
      data,
      meta: {
        total,
        page,
        limit,
        totalPage: Math.ceil(total / limit),
      }
    };
     


    return result

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
