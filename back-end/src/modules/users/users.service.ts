import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '@/services/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repoUser: Repository<User>,
    private readonly cloudiarySevice: CloudinaryService,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const users = await this.repoUser.find({
      where: {
        role: {
          name: 'customer',
        },
      },

      relations: ['role'],

      order: {
        created_at: 'DESC',
      },
    });

    return users.map((user) => ({
      ...user,
      role: user.role?.name,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(
    id: number,
    name?: string,
    file?: Express.Multer.File,
    phone?: string,
  ) {
    const user = await this.repoUser.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (file) {
      const result = await this.cloudiarySevice.uploadFile(file);

      if (result) {
        user.avatarUrl = result.secure_url;
        user.publicId = result.public_id;
      }
    }

    await this.repoUser.save(user);

    return {
      message: 'Cập nhật thành công',
      data: user,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
