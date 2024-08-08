import { PartialType } from '@nestjs/swagger';
import { CreateUserPostDto } from './create-user_post.dto';

export class UpdateUserPostDto extends PartialType(CreateUserPostDto) {}
