import { Module } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
