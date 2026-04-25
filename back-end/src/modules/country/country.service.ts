import { Country } from '@/entities/country.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class countTryService {
  constructor(
    @InjectRepository(Country) private countryRepo: Repository<Country>,
  ) {}

  async createCountry(name: string) {
    if (name.trim() === '') {
      throw new BadRequestException('Vui lòng nhập tên quốc gia');
    }

    const exsit = await this.countryRepo.findOneBy({ name });

    if (exsit) {
      throw new NotFoundException('Tên quốc gia đã tồn tại');
    }

    const country = this.countryRepo.create({ name });

    return await this.countryRepo.save(country);
  }

  async getCountryById(id: number) {
    const exsit = await this.countryRepo.findOneBy({ id });

    if (!exsit) {
      throw new NotFoundException('Quốc gia không tồn tại trong database');
    }

    return exsit;
  }

  async getAllCountry() {
    const countrys = await this.countryRepo.find({
      relations: {
        products: true,
      },
    });

    return countrys;
  }

  async updateCountry(id: number, name: string) {
    const exsit = await this.countryRepo.findOneBy({ id });

    if (!exsit) {
      throw new NotFoundException('Quốc gia không tồn tại trong database');
    }

    const result = this.countryRepo.merge(exsit, { name });

    return await this.countryRepo.save(result);
  }

  async deleteCountry(id: number) {
    const exsit = await this.countryRepo.findOneBy({ id });

    if (!exsit) {
      throw new NotFoundException('Quốc gia không tồn tại trong database');
    }

    return await this.countryRepo.delete(exsit);
  }
}
