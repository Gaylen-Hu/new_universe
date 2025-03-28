import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Note]), // 导入实体的Repository
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
