import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewImagesService } from './review_images.service';
import { CreateReviewImageDto } from './dto/create-review_image.dto';
import { UpdateReviewImageDto } from './dto/update-review_image.dto';

@Controller('review-images')
export class ReviewImagesController {
  constructor(private readonly reviewImagesService: ReviewImagesService) {}

  @Post()
  create(@Body() createReviewImageDto: CreateReviewImageDto) {
    return this.reviewImagesService.create(createReviewImageDto);
  }

  @Get()
  findAll() {
    return this.reviewImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewImageDto: UpdateReviewImageDto) {
    return this.reviewImagesService.update(+id, updateReviewImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewImagesService.remove(+id);
  }
}
