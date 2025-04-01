import { registerAs } from '@nestjs/config';

export default registerAs('oss', () => ({
  region: process.env.OSS_REGION,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET,
  roleArn: process.env.OSS_ROLE_ARN,
  roleSessionName: process.env.OSS_ROLE_SESSION_NAME || 'nestjs-oss-session',
  durationSeconds: parseInt(process.env.OSS_DURATION_SECONDS || '3600', 10),
}));