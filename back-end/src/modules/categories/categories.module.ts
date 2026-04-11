import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities';
import { CategoryTranslation } from '@/entities/category_translations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, CategoryTranslation])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
