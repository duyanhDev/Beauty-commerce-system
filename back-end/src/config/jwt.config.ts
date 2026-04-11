import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { StringValue } from 'ms';
export const jwtConfigAsync = (
  configService: ConfigService,
): JwtModuleOptions => ({
  secret: configService.get<string>('JWT_SECRET'),
  signOptions: {
    expiresIn: configService.get<string>('JWT_EXPIRES_IN') as StringValue,
  },
});
export const jwtAccessConfig = {
  expiresIn: '15m',
};

export const jwtRefreshConfig = {
  expiresIn: '7d',
};
