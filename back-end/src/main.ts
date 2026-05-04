import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('🔥 Step 3');
  // ====== Global Prefix ======
  app.setGlobalPrefix('api/v1');

  app.use(cookieParser()); // ✅ Bắt buộc để đọc req.cookies

  app.enableCors({
    origin: ['http://localhost', 'http://localhost:3000'],
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

  console.log('🔥 Step 3');

  const port = process.env.PORT ?? 5000;

  console.log(port);

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server is running on: http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger docs:         http://localhost:${port}/api/docs`);
}
bootstrap();
