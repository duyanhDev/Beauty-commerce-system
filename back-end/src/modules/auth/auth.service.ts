import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto/Auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '../../entities/index';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserSession } from '@/entities/user_sessions.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repoUser: Repository<User>,
    @InjectRepository(Role) private readonly repoRole: Repository<Role>,
    @InjectRepository(UserSession)
    private sessionRepo: Repository<UserSession>,
    private jwtService: JwtService,
  ) {}
  private buildPayload(user: { id: number; email: string; role: any }) {
    return { sub: user.id, email: user.email, role: user.role.name };
  }

  private signTokens(payload: { sub: number; email: string }) {
    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { access_token, refresh_token };
  }
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.repoUser.findOne({
      where: { email },
      relations: { role: true },
    });

    if (!user) throw new UnauthorizedException('Email không tồn tại');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Mật khẩu không đúng');

    const { password: _, ...safeUser } = user;

    return safeUser as User;
  }
  async create(dto: RegisterDto) {
    const existingUser = await this.repoUser.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại trong database');
    }

    const role = await this.repoRole.findOne({
      where: { name: 'customer' },
    });

    if (!role) {
      throw new NotFoundException('Role không tồn tại');
    }

    const salt = 10;
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const user = this.repoUser.create({
      ...dto,
      password: passwordHash,
      role: role,
    });

    return await this.repoUser.save(user);
  }

  async login(user: User, device: string, ip: string) {
    const payload = this.buildPayload(user);

    const { access_token, refresh_token } = this.signTokens(payload);

    const hash = await bcrypt.hash(refresh_token, 10);
    const session = await this.sessionRepo.save({
      user,
      refreshToken: hash,
      device: device ?? 'unknown',
      ip,
    });

    return { access_token, refresh_token, user, sessionId: session.id };
  }

  async refreshToken(refreshToken: string) {
    let payload: { sub: number; email: string };

    try {
      payload = this.jwtService.verify(refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
    }

    const sesions = await this.sessionRepo.find({
      where: { user: { id: payload.sub } },
      relations: ['user', 'user.role'],
    });
    let currentSession: UserSession | null = null;

    for (const session of sesions) {
      const isMatch = await bcrypt.compare(refreshToken, session.refreshToken);
      if (isMatch) {
        currentSession = session;
        break;
      }
    }

    // FIX 2: Theft detection — token hợp lệ nhưng không khớp session nào
    // → có thể đã bị đánh cắp và rotate trước → revoke toàn bộ
    if (!currentSession) {
      await this.logoutAll(payload.sub);
      throw new UnauthorizedException(
        'Phát hiện token bị tái sử dụng. Toàn bộ phiên đã bị thu hồi.',
      );
    }

    const newPayload = this.buildPayload(currentSession.user);

    const { access_token, refresh_token } = this.signTokens(newPayload);

    const newHash = await bcrypt.hash(refresh_token, 10);

    await this.sessionRepo.update(currentSession.id, {
      refreshToken: newHash,
    });

    return { access_token, refresh_token };
  }

  // ─── LOGOUT 1 DEVICE ──────────────────────────────────
  // ─── LOGOUT 1 DEVICE ──────────────────────────────────
  async logout(refreshToken: string) {
    // Phải verify token trước để lấy userId, rồi tìm session theo user
    let payload: { sub: number; email: string };
    try {
      payload = this.jwtService.verify(refreshToken);
    } catch {
      throw new UnauthorizedException('Token không hợp lệ');
    }

    // Tìm tất cả session của user rồi so sánh hash (giống refreshToken())
    const sessions = await this.sessionRepo.find({
      where: { user: { id: payload.sub } },
    });

    let targetSession: UserSession | null = null;
    for (const session of sessions) {
      const isMatch = await bcrypt.compare(refreshToken, session.refreshToken);
      if (isMatch) {
        targetSession = session;
        break;
      }
    }

    if (!targetSession) {
      throw new UnauthorizedException('Session không tồn tại');
    }

    await this.sessionRepo.delete(targetSession.id);
    return targetSession;
  }

  async logoutAll(userId: number) {
    await this.sessionRepo.delete({ user: { id: userId } });
  }
  // ─── LIST SESSIONS ────────────────────────────────────
  async getSessions(userId: number) {
    return this.sessionRepo.find({
      where: { user: { id: userId } },
      select: ['id', 'device', 'ip', 'created_at'],
    });
  }

  async getMe(userId: number) {
    const user = await this.repoUser.findOne({
      where: { id: userId },
      relations: { role: true }, // ✅ load role object đầy đủ
    });

    if (!user) throw new NotFoundException('User không tồn tại');

    const { password: _, ...safeUser } = user;
    return safeUser;
  }
}
