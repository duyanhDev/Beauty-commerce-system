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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto, RegisterDto } from './dto/Auth.dto';
import { ApiResponse } from '@nestjs/swagger';
import type { Request } from 'express';

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
  async login(@Body() body: LoginDto, @Req() req: Request) {
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.ip ||
      'unknown';
    const parser = new UAParser(req.headers['user-agent']);

    const result = parser.getResult();

    const device = `${result.browser.name} ${result.os.name}`;
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user, device ?? 'unknown', ip);
  }
  // ─── POST /auth/refresh ────────────────────────────────
  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    if (!refreshToken) {
      throw new Error('refresh_token is required');
    }
    return this.authService.refreshToken(refreshToken);
  }

  // ─── DELETE /auth/logout/:sessionId ───────────────────
  @UseGuards(AuthGuard('jwt'))
  @Delete('logout/:sessionId')
  async logout(@Param('sessionId', ParseIntPipe) sessionId: number) {
    await this.authService.logout(sessionId);
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
