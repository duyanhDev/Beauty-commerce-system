import { Module } from '@nestjs/common';
import { OrderStatusHistoryService } from './order-status-history.service';
import { OrderStatusHistoryController } from './order-status-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusHistory } from '../../entities/index';
@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusHistory])],
  controllers: [OrderStatusHistoryController],
  providers: [OrderStatusHistoryService],
})
export class OrderStatusHistoryModule {}
