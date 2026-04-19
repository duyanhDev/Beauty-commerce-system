import { Brand } from '@/entities/brand.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  async createBrand(name: string) {
    console.log(name);

    if (name.trim() === '') {
      throw new BadRequestException('Vul lòng nhập tên thương hiệu');
    }

    const exsiting = await this.brandRepo.findOneBy({
      name: name,
    });

    if (exsiting) {
      throw new NotFoundException('Tên thương hiệu đã tồn tại');
    }

    const brand = this.brandRepo.create({ name });

    return await this.brandRepo.save(brand);
  }

  async getByIdBrand(id: number) {
    const exsiting = await this.brandRepo.findOneBy({ id });

    if (!exsiting) {
      throw new NotFoundException('Không có thương hiệu này');
    }
    return exsiting;
  }

  async getAllBrand() {
    return await this.brandRepo.find({
      relations: {
        products: true,
      },
    });
  }

  async updateNameBrand(id: number, name: string) {
    const exsiting = await this.brandRepo.findOneBy({ id });

    if (!exsiting) {
      throw new NotFoundException('Không có thương hiệu này');
    }

    const result = this.brandRepo.merge(exsiting, { name });

    return this.brandRepo.save(result);
  }

  async deleteBrand(id: number) {
    const exsiting = await this.brandRepo.findOneBy({ id });

    if (!exsiting) {
      throw new NotFoundException('Không có thương hiệu này');
    }
    return await this.brandRepo.delete(exsiting);
  }
}
