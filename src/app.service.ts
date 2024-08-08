import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
    console.log('configService',this.configService);
    console.log('Database Username:', this.configService.get<string>('DATABASE_USERNAME'));
    console.log('Database Password:', this.configService.get<string>('DATABASE_PASSWORD'));
  }
  getHello(): string {
    return 'Hello World!';
  }
}
