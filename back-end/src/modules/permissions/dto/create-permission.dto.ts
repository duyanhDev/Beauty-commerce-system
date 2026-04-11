import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ example: 'product.view' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}
