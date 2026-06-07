import { Module } from '@nestjs/common';
import { AttributeValuesService } from './attribute-values.service';
import { AttributeValuesController } from './attribute-values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValue } from 'src/entities';
import { AttributeValueImage } from '@/entities/attribute_value_images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeValue, AttributeValueImage])],
  controllers: [AttributeValuesController],
  providers: [AttributeValuesService],
})
export class AttributeValuesModule {}
