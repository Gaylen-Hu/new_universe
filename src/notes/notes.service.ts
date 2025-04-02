import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between } from 'typeorm';
@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}
  create(createNoteDto: CreateNoteDto) {
    const note = this.noteRepository.create(createNoteDto);
    return this.noteRepository.save(note);
  }

  async findAll() {
    return this.noteRepository.find();
  }

  async findOne(id: number) {
    return this.noteRepository.findOne({ where: { id } });  
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    await this.noteRepository.update(id, updateNoteDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await  this.noteRepository.delete(id);
    if (result.affected === 0) {
      return '删除失败';
    }
  }
  async batchRemove(ids: string) {
    const idArr = ids.split(',');
    const result = await this.noteRepository.delete(idArr);
    if (result.affected === 0) {
      return '删除失败';
    }
  }
  
  async list(query: any): Promise<any> {
    const { page = 1, pageSize = 10, content, tags, createdAt,locale } = query;
    const where: any = {};
    if (content) {
      where.content = In(content.split(','));
    }
    if (tags) {
      where.tags = In(tags.split(','));
    }
    if (createdAt) {
      where.createdAt = Between(createdAt.split(',')[0], createdAt.split(',')[1]);
    }

    if (locale) {
      where.locale = locale;
    }
    const [list, total] = await this.noteRepository.findAndCount({
      where,
      take: +pageSize,
      skip: (+page - 1) * +pageSize,
    });
    return {
      rows: list,
      total,
      page: +page,
      pageSize: +pageSize,
    };
  }
  // recommend
  async recommend(query: any): Promise<any> {
    const { page = 1, pageSize = 10,locale } = query;
    console.log('locale', locale);
    const [list, total] = await this.noteRepository.findAndCount({
      take: +pageSize,
      skip: (+page - 1) * +pageSize,
      where: {
        locale,
      },
    });
    return {
      rows: list,
      total,
      page: +page,
      pageSize: +pageSize,
    };
  }
}
