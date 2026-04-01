import { Module } from '@nestjs/common';
import { AttributeValuesService } from './attribute-values.service';
import { AttributeValuesController } from './attribute-values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValue } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeValue])],
  controllers: [AttributeValuesController],
  providers: [AttributeValuesService],
})
export class AttributeValuesModule {}
