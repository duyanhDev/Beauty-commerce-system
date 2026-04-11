import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRolePermissionDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  roleId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  permissionId: number;

  @IsNumber()
  @Type(() => Number)
  assignedBy?: number;
}
