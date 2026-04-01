import { PartialType } from '@nestjs/swagger';
import { CreateReviewImageDto } from './create-review_image.dto';

export class UpdateReviewImageDto extends PartialType(CreateReviewImageDto) {}
