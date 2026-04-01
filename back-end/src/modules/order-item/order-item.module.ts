import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from '../../entities/index';
import { ProductVariant } from 'src/entities/product_variants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, ProductVariant])],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
