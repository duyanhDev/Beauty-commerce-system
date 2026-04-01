import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/Auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '../../entities/index';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repoUser: Repository<User>,
    @InjectRepository(Role) private readonly repoRole: Repository<Role>,
  ) {}

  async create(dto: RegisterDto) {
    // 1. check email
    const existingUser = await this.repoUser.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại trong database');
    }

    // 2. lấy role có sẵn
    const role = await this.repoRole.findOne({
      where: { name: 'customer' },
    });

    if (!role) {
      throw new NotFoundException('Role không tồn tại');
    }

    // 3. tạo user
    const user = this.repoUser.create({
      ...dto,
      role,
    });

    return await this.repoUser.save(user);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
