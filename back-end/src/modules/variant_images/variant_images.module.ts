import { Module } from '@nestjs/common';
import { VariantImagesService } from './variant_images.service';
import { VariantImagesController } from './variant_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantImage } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([VariantImage])],
  controllers: [VariantImagesController],
  providers: [VariantImagesService],
})
export class VariantImagesModule {}
