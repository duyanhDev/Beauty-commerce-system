import { Module } from '@nestjs/common';
import { InventoryLogsService } from './inventory_logs.service';
import { InventoryLogsController } from './inventory_logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryLog } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryLog])],
  controllers: [InventoryLogsController],
  providers: [InventoryLogsService],
})
export class InventoryLogsModule {}
