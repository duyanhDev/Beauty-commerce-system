import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/index';
import { Brand } from '@/entities/brand.entity';
import { Country } from '@/entities/country.entity';
import { Gender } from '@/entities/gender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Country, Gender])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
