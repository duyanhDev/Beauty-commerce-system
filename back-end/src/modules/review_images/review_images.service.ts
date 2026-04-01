import { Injectable } from '@nestjs/common';
import { CreateReviewImageDto } from './dto/create-review_image.dto';
import { UpdateReviewImageDto } from './dto/update-review_image.dto';

@Injectable()
export class ReviewImagesService {
  create(createReviewImageDto: CreateReviewImageDto) {
    return 'This action adds a new reviewImage';
  }

  findAll() {
    return `This action returns all reviewImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewImage`;
  }

  update(id: number, updateReviewImageDto: UpdateReviewImageDto) {
    return `This action updates a #${id} reviewImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewImage`;
  }
}
