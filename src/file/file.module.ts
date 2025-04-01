import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ConfigModule } from '../config/config.module'; // 添加这行
@Module({
  imports: [TypeOrmModule.forFeature([File]),
  ConfigModule
],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}