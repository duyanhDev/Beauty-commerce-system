import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductAttributeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
