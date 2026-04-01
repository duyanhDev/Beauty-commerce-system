import { Module } from '@nestjs/common';
import { ReviewImagesService } from './review_images.service';
import { ReviewImagesController } from './review_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewImage } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewImage])],
  controllers: [ReviewImagesController],
  providers: [ReviewImagesService],
})
export class ReviewImagesModule {}
