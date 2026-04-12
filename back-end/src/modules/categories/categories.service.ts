import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@/entities';
import { Repository } from 'typeorm';
import { CategoryTranslation } from '@/entities/category_translations.entity';
import { CreateCategoryTranslationDto } from '../category_translations/dto/create-category_translation.dto';
import { generateSlug } from '@/pipe/generateSlug';
import { QueryDto } from '@/shared/queryDto.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repoCategory: Repository<Category>,
    @InjectRepository(CategoryTranslation)
    private readonly repoCategoryTranslation: Repository<CategoryTranslation>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    // check duplicate
    const existingName = await this.repoCategory.findOneBy({
      name: createCategoryDto.name,
    });

    if (existingName) {
      throw new BadRequestException('Tên category đã tồn tại');
    }

    // generate slug
    if (createCategoryDto.name) {
      createCategoryDto.slug = generateSlug(createCategoryDto.name);
    }
    let parent;
    if (createCategoryDto.parentId) {
      parent = await this.repoCategory.findOneBy({
        id: createCategoryDto.parentId,
      });

      if (!parent) {
        throw new BadRequestException('Parent category không tồn tại');
      }
    }

    // create category
    const category = this.repoCategory.create({
      ...createCategoryDto,
      parent,
    });

    const result = await this.repoCategory.save(category);

    // create translations
    if (createCategoryDto.translation?.length) {
      const categoryTranslations = createCategoryDto.translation.map((trans) =>
        this.repoCategoryTranslation.create({
          ...trans,
          category: result,
        }),
      );

      await this.repoCategoryTranslation.save(categoryTranslations);
    }

    return result;
  }
  async findAll(dto: QueryDto) {
    const { page = 1, limit = 10, keyword, sortBy, order } = dto;

    const allowedSortFields: Record<string, string> = {
      createdAt: 'category.createdAt',
      name: 'category.name',
      id: 'category.id',
    };

    const query = this.repoCategory
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.parent', 'parent')
      .leftJoinAndSelect('category.children', 'children');

    if (keyword) {
      query.andWhere(`category.name LIKE :keyword`, {
        keyword: `%${keyword}%`,
      });
    }

    const sortField = allowedSortFields[sortBy] ?? 'category.createdAt';
    query.orderBy(sortField, order === 'DESC' ? 'DESC' : 'ASC');

    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(slug: string) {
    const existing = await this.repoCategory.findOneBy({ slug: slug });

    if (!existing) {
      throw new NotFoundException(`Category không tồn tại ${slug} này`);
    }

    return existing;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const existing = await this.repoCategory.findOneBy({ id });

    if (!existing) {
      throw new NotFoundException(`Category không tồn tại ${id} này`);
    }

    const category = this.repoCategory.merge(existing, updateCategoryDto);

    const result = await this.repoCategory.save(category);

    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
