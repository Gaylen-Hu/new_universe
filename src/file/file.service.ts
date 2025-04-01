import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const { STS } = require('ali-oss');
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async getOssStsToken() {
    const sts = new STS({
      accessKeyId: this.configService.get('OSS_ACCESS_KEY_ID'),
      accessKeySecret: this.configService.get('OSS_ACCESS_KEY_SECRET'),
    });

    try {
      const result = await sts.assumeRole(
        this.configService.get('OSS_ROLE_ARN'),
        this.getPolicy(),
        this.configService.get('OSS_DURATION_SECONDS', '3600'),
        this.configService.get('OSS_ROLE_SESSION_NAME', 'nestjs-sts-session')
      );

      return {
        AccessKeyId: result.credentials.AccessKeyId,
        AccessKeySecret: result.credentials.AccessKeySecret,
        SecurityToken: result.credentials.SecurityToken,
        Expiration: result.credentials.Expiration,
        Region: this.configService.get('OSS_REGION'),
        Bucket: this.configService.get('OSS_BUCKET'),
      };
    } catch (error) {
      throw new Error(`STS Error: ${error.message}`);
    }
  }
  private getPolicy() {
    const bucket = this.configService.get('OSS_BUCKET');
    return JSON.stringify({
      Version: '1',
      Statement: [
        {
          Effect: 'Allow',
          Action: ['oss:PutObject'],
          Resource: [`acs:oss:*:*:${bucket}/*`],
        },
      ],
    });
  }
  async saveFileInfo(fileInfo: Partial<File>): Promise<File> {
    return this.fileRepository.save(fileInfo);
  }
}