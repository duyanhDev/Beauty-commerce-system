import { Module } from '@nestjs/common';
import { CategoryTranslationsService } from './category_translations.service';
import { CategoryTranslationsController } from './category_translations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTranslation } from 'src/entities/category_translations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryTranslation])],
  controllers: [CategoryTranslationsController],
  providers: [CategoryTranslationsService],
})
export class CategoryTranslationsModule {}
