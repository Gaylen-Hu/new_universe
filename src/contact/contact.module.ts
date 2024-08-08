import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MailModule } from '../mail/mail.module'; // Adjust the path as needed

@Module({
  imports: [
    MailModule, // Import the MailModule
    TypeOrmModule.forFeature([Contact]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
