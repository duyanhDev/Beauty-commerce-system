import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { AttributeValue, ProductAttribute } from '@/entities';

@Injectable()
export class AttributeValuesService {
  constructor(
    @InjectRepository(AttributeValue)
    private repoAttribute: Repository<AttributeValue>,
    private entitymanager: EntityManager,
  ) {}
  async create(createAttributeValueDto: CreateAttributeValueDto) {
    const product_attribibute_value = await this.entitymanager.findOneBy(
      ProductAttribute,
      {
        id: createAttributeValueDto.atrribute_id,
      },
    );

    if (!product_attribibute_value) {
      throw new NotFoundException('Không tìm thấy quản lý dung tích nào cả');
    }

    const atrribute_value = this.entitymanager.create(AttributeValue, {
      ...createAttributeValueDto,
      attribute: product_attribibute_value,
    });

    return this.entitymanager.save(AttributeValue, atrribute_value);
  }

  async findAll() {
    const data = this.repoAttribute.find({
      order: {
        id: 'DESC',
      },
      relations: ['attribute'],
    });

    return data;
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
