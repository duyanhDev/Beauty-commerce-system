import { Injectable } from '@nestjs/common';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttributeValue } from '@/entities';

@Injectable()
export class AttributeValuesService {
  constructor(
    @InjectRepository(AttributeValue)
    private repoAttribute: Repository<AttributeValue>,
  ) {}
  create(createAttributeValueDto: CreateAttributeValueDto) {}

  findAll() {
    return `This action returns all attributeValues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attributeValue`;
  }

  update(id: number, updateAttributeValueDto: UpdateAttributeValueDto) {
    return `This action updates a #${id} attributeValue`;
  }

  remove(id: number) {
    return `This action removes a #${id} attributeValue`;
  }
}
