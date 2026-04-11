import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'tsconfig-paths/register';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ====== Global Prefix ======
  app.setGlobalPrefix('api/v1');

  app.use(cookieParser()); // ✅ Bắt buộc để đọc req.cookies

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // ====== Validation Pipe ======
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // tự xoá field không có trong DTO
      forbidNonWhitelisted: true, // báo lỗi nếu gửi field lạ
      transform: true, // tự convert kiểu dữ liệu (string -> number, ...)
    }),
  );

  // ====== Swagger ======
  const config = new DocumentBuilder()
    .setTitle('Cosmetics Shop API')
    .setDescription('API documentation cho website bán mỹ phẩm')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token', // tên dùng trong @ApiBearerAuth('access-token')
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // giữ token sau khi reload trang
    },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server is running on: http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger docs:         http://localhost:${port}/api/docs`);
}
bootstrap();
