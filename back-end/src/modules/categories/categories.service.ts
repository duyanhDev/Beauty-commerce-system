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

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
