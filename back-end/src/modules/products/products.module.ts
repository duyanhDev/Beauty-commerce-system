import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Category,
  Product,
  Brand,
  Country,
  Gender,
  ProductTranslation,
} from '../../entities/index';
import { CloudinaryService } from '@/services/cloudinary/cloudinary.service';
import { CloudinaryModule } from '@/services/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Brand,
      Country,
      Gender,
      ProductTranslation,
      Category,
    ]),
    CloudinaryModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
