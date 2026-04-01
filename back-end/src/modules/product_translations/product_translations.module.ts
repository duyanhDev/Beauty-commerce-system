import { Module } from '@nestjs/common';
import { ProductTranslationsService } from './product_translations.service';
import { ProductTranslationsController } from './product_translations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTranslation } from 'src/entities/product-translations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTranslation])],
  controllers: [ProductTranslationsController],
  providers: [ProductTranslationsService],
})
export class ProductTranslationsModule {}
