import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductAttributeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Tên thuộc tính',
  })
  name: string;
  @ApiProperty({
    example: 'Mô tả',
  })
  @IsString()
  description: string;
}
