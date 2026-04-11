import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../../../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET', 'secret_key'),
    });
  }
  async validate(payload: { sub: number; email: string }) {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
      relations: {
        role: {
          rolePermissions: {
            permission: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('User không tồn tại');
    }

    const permissions =
      user.role.rolePermissions?.map((rp) => rp.permission.name) ?? [];
    console.log('permissions', permissions);

    return {
      id: user.id,
      email: user.email,
      role: user.role.name,
      permissions,
    };
  }
}
