import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({ description: 'Original name of the file', example: 'profile.jpg' })
  @IsNotEmpty()
  @IsString()
  originalName: string;

  @ApiProperty({ description: 'Generated filename for storage', example: 'a1b2c3d4-profile.jpg' })
  @IsNotEmpty()
  @IsString()
  filename: string;

  @ApiProperty({ description: 'File size in bytes', example: 1024 })
  @IsNotEmpty()
  @IsNumber()
  size: number;

  @ApiProperty({ description: 'MIME type of the file', example: 'image/jpeg' })
  @IsNotEmpty()
  @IsString()
  mimeType: string;

  // OSS information
  @ApiProperty({ description: 'Storage bucket name', example: 'my-bucket' })
  @IsNotEmpty()
  @IsString()
  bucket: string;
  
  @ApiProperty({ description: 'Object key in storage', example: 'uploads/a1b2c3d4-profile.jpg' })
  @IsNotEmpty()
  @IsString()
  key: string;
  
  @ApiProperty({ description: 'Public access URL', example: 'https://my-bucket.s3.amazonaws.com/uploads/a1b2c3d4-profile.jpg' })
  @IsNotEmpty()
  @IsString()
  url: string;

  // Image dimensions
  @ApiPropertyOptional({ description: 'Image width in pixels', example: 1920 })
  @IsOptional()
  @IsNumber()
  width?: number;
  
  @ApiPropertyOptional({ description: 'Image height in pixels', example: 1080 })
  @IsOptional()
  @IsNumber()
  height?: number;

  // Image descriptions
  @ApiPropertyOptional({ description: 'Title for the image', example: 'Profile Picture' })
  @IsOptional()
  @IsString()
  title?: string;
  
  @ApiPropertyOptional({ description: 'Detailed description of the image', example: 'User profile picture taken in 2023' })
  @IsOptional()
  @IsString()
  description?: string;
  
  @ApiPropertyOptional({ description: 'Alternative text for accessibility', example: 'User profile photo smiling' })
  @IsOptional()
  @IsString()
  altText?: string;

  // Image variants
  @ApiPropertyOptional({
    description: 'Different processed versions of the image',
    example: {
      raw: 'https://example.com/raw.jpg',
      full: 'https://example.com/full.jpg',
      regular: 'https://example.com/regular.jpg',
      small: 'https://example.com/small.jpg',
      thumb: 'https://example.com/thumb.jpg'
    }
  })
  @IsOptional()
  variants?: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };

  // EXIF metadata
  @ApiPropertyOptional({
    description: 'EXIF metadata from the image',
    example: {
      make: 'Canon',
      model: 'EOS 5D Mark IV',
      exposure: '1/250',
      aperture: 'f/5.6',
      iso: 200,
      focalLength: '50mm',
      takenAt: '2023-01-15T12:30:00.000Z',
      gps: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    }
  })
  @IsOptional()
  exif?: {
    make?: string;
    model?: string;
    exposure?: string;
    aperture?: string;
    iso?: number;
    focalLength?: string;
    takenAt?: Date;
    gps?: {
      latitude?: number;
      longitude?: number;
    };
  };

  // Technical metadata
  @ApiPropertyOptional({
    description: 'Technical image metadata',
    example: {
      colorPalette: ['#ff0000', '#00ff00', '#0000ff'],
      blurHash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.',
      dominantColor: '#ff0000'
    }
  })
  @IsOptional()
  metadata?: {
    colorPalette?: string[];
    blurHash?: string;
    dominantColor?: string;
  };
}