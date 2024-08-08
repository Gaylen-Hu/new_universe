import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}
  async create(createContactDto: CreateContactDto) {
    const contact = this.contactRepository.create(createContactDto);
    return this.contactRepository.save(contact);
  }

  async findAll() {
    return this.contactRepository.find();
  }

  async findOne(id: number) {
    return this.contactRepository.findOne({ where: { contactId: id } });
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    await this.contactRepository.update(id, updateContactDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.contactRepository.delete(id);
  }
}
