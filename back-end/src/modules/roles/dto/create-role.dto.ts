import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'customer' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Quyền khách hàng' })
  @IsString()
  description: string;
}
