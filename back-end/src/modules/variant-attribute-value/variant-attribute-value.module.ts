import { Module } from '@nestjs/common';
import { VariantAttributeValueService } from './variant-attribute-value.service';
import { VariantAttributeValueController } from './variant-attribute-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantAttributeValue } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([VariantAttributeValue])],
  controllers: [VariantAttributeValueController],
  providers: [VariantAttributeValueService],
})
export class VariantAttributeValueModule {}
