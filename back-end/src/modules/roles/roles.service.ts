import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../entities/index';
import { Repository } from 'typeorm';
import { QueryDto } from '@/dto/query.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly repoRole: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    if (
      createRoleDto.name.trim() === '' ||
      createRoleDto.description.trim() === ''
    ) {
      throw new BadRequestException(
        'Vui lòng nhập đầy đủ tên quyền hoặc mô tả',
      );
    }

    const nameExist = await this.repoRole.findOne({
      where: { name: createRoleDto.name },
    });

    if (nameExist) {
      throw new BadRequestException('Tên quyền đã tồn tại');
    }

    const role = this.repoRole.create(createRoleDto);
    return await this.repoRole.save(role);
  }

  async findAll({ page = 1, limit = 10, q, sort, sortBy }: QueryDto) {
    const qb = this.repoRole.createQueryBuilder('role');
    const sortField = sortBy || 'id';
    const sortOrder = sort || 'ASC';
    if (q) {
      qb.andWhere('role.name LIKE :q', { q: `%${q}%` });
    }
    qb.skip((page - 1) * limit)
      .take(limit)
      .orderBy(`${sortField}`, sortOrder);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
      },
    };
  }

  findOne(id: number) {
    try {
      const roleExist = this.repoRole.findOne({ where: { id: id } });

      if (!roleExist) {
        throw new NotFoundException(`Không tìm thấy quyền theo id ${id} `);
      }

      return roleExist;
    } catch (error: any) {
      console.log(error);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    if (!id) {
      throw new BadRequestException('ID không hợp lệ');
    }

    const roleExist = await this.repoRole.findOne({
      where: { id },
    });

    if (!roleExist) {
      throw new NotFoundException('Không tìm thấy quyền');
    }

    const updated = this.repoRole.merge(roleExist, updateRoleDto);

    return await this.repoRole.save(updated);
  }
  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
