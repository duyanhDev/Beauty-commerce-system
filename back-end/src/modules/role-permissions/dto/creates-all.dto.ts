import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatesDto {
  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @IsArray()
  @IsNumber({}, { each: true }) // 👈 validate từng phần tử
  @Type(() => Number) // 👈 convert string -> number (quan trọng)
  permissionId: number[];

  @IsNumber()
  assignedBy?: number; // optional
}
