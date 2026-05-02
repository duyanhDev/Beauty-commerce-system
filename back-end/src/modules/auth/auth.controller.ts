import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ParseIntPipe,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/Auth.dto';
import { ApiResponse } from '@nestjs/swagger';
import type { Request } from 'express';
import type { Response } from 'express';
import { UAParser } from 'ua-parser-js';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Tạo tài khoản mới thành công' })
  @ApiResponse({ status: 404, description: 'Lỗi khi tạo tài khoản mới ' })
  async create(@Body() createAuthDto: RegisterDto) {
    const data = await this.authService.create(createAuthDto);

    return {
      EC: 0,
      message: 'Tạo tài khoản mới thành công',
      data: data,
    };
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.ip ||
      'unknown';
    const parser = new UAParser(req.headers['user-agent']);

    const result = parser.getResult();

    const device = `${result.browser.name} ${result.os.name}`;
    const user = await this.authService.validateUser(body.email, body.password);

    const { access_token, refresh_token } = await this.authService.login(
      user,
      device ?? 'unknown',
      ip,
    );

    res.cookie('access_token', access_token, {
      httpOnly: true, // JS không đọc được
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 1000, // 15 phút (ms)
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày (ms)
    });

    return {
      EC: 0,
      message: 'Đăng nhập thành công',
      user,
      access_token,
      refresh_token,
    };
  }
  // ─── POST /auth/refresh ────────────────────────────────
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // ✅ Đọc từ cookie thay vì body
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken)
      throw new UnauthorizedException('Không có refresh token');

    const { access_token, refresh_token } =
      await this.authService.refreshToken(refreshToken);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 1000,
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Token đã được làm mới' };
  }

  // ─── DELETE /auth/logout/:sessionId ───────────────────
  @UseGuards(AuthGuard('jwt'))
  @Delete('logout/:sessionId')
  async logout(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(sessionId);

    // ✅ Xóa cookie
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return { message: 'Đăng xuất thành công' };
  }
  // ─── DELETE /auth/logout-all ───────────────────────────
  @UseGuards(AuthGuard('jwt'))
  @Delete('logout-all')
  async logoutAll(@Req() req: Request & { user: any }) {
    await this.authService.logoutAll(req.user.id);
    return { message: 'Đã đăng xuất toàn bộ thiết bị' };
  }

  // ─── GET /auth/sessions ────────────────────────────────
  @UseGuards(AuthGuard('jwt'))
  @Get('sessions')
  async getSessions(@Req() req: Request & { user: any }) {
    return this.authService.getSessions(req.user.id);
  }
}
