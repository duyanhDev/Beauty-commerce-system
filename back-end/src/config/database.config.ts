import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    port: configService.get<number>('DB_PORT'),
    url: process.env.MYSQL_PUBLIC_URL,
    autoLoadEntities: true,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  }),
};
