import { Controller,UseInterceptors, UploadedFile,Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { MailService } from '../mail/mail.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('联系我们')
@Controller('contact')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly mailService: MailService
    ) {}

@ApiOperation({ summary: '创建联系我们' })
@ApiBody({ type: CreateContactDto })
@Post()
@UseInterceptors(FileInterceptor('file'))
async create(@Body() createContactDto: CreateContactDto,) {
  if (!createContactDto) {
    return { msg: '操作失败', code: 401 };
  }
  const to = 'hxyrkcy@outlook.com';
  const subject = '来自博客的联系我们';
  const text = `姓名：${createContactDto.name}，邮箱：${createContactDto.email}，主题：${createContactDto.subject}，内容：${createContactDto.message}`;

  await this.mailService.sendMail(to, subject, text);
  return this.contactService.create(createContactDto);
}

  @ApiOperation({ summary: '获取所有联系我们' })
  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @ApiOperation({ summary: '根据ID获取联系我们' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @ApiOperation({ summary: '更新联系我们信息' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @ApiOperation({ summary: '删除联系我们' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
