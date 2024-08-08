import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

import { ResponseInterceptor } from './common/filters/response.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  console.log('Initializing Nest application...');
  
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.sendStatus(200);
    } else {
      next();
    }
  });
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, // 最多100次请求
  }));
  const config = new DocumentBuilder()
    .setTitle('墨千API')
    .setDescription('墨千API文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3009);
  console.log('Nest application successfully started');
}
bootstrap();
