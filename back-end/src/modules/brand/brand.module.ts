import { Brand } from '@/entities/brand.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  exports: [],
})
export class BrandModule {}
