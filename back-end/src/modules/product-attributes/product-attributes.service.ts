import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttribute } from '@/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProductAttributesService {

  constructor( @InjectRepository(ProductAttribute) private repoAtrribute:Repository<ProductAttribute>){}
 async create(createProductAttributeDto: CreateProductAttributeDto) {
     
    const name = await this.repoAtrribute.findOne({where:{name:createProductAttributeDto.name}})

    if (name){
        throw new NotFoundException("Tên attribute đã tồn tại trong database");
    }

    const attribute = this.repoAtrribute.create(createProductAttributeDto)

    return await this.repoAtrribute.save(attribute)
  }

 async findAll() {
     const attributes = await this.repoAtrribute.find()

     return attributes
  }

  findOne(id: number) {
    return `This action returns a #${id} productAttribute`;
  }

  update(id: number, updateProductAttributeDto: UpdateProductAttributeDto) {
    return `This action updates a #${id} productAttribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} productAttribute`;
  }
}
