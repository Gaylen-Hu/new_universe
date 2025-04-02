import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalName: string;

  @Column()
  filename: string;

  @Column()
  size: number;

  @Column()
  mimeType: string;

  // 基础 OSS 信息
  @Column()
  bucket: string;
  
  @Column()
  key: string;
  
  @Column()
  url: string; // 原始文件访问URL

  // 图片尺寸信息
  @Column({ nullable: true })
  width: number;
  
  @Column({ nullable: true })
  height: number;

  // 图片描述信息（用于alt属性）
  @Column({ nullable: true })
  title: string;
  
  @Column({ nullable: true, type: 'text' })
  description: string;
  
  @Column({ nullable: true })
  altText: string;

  // 图片处理版本
  @Column({ type: 'json', nullable: true })
  variants: {
    raw: string;    // 原始图
    full: string;   // 全尺寸处理版
    regular: string; // 常规展示尺寸
    small: string;   // 小图
    thumb: string;   // 缩略图
  };

  // EXIF 元数据（从图片提取）
  @Column({ type: 'json', nullable: true })
  exif: {
    make?: string;      // 相机品牌
    model?: string;     // 相机型号
    exposure?: string;  // 曝光时间
    aperture?: string;  // 光圈
    iso?: number;       // ISO
    focalLength?: string; // 焦距
    takenAt?: Date;     // 拍摄时间
    gps?: {            // GPS信息
      latitude?: number;
      longitude?: number;
    };
  };

  // 技术元数据
  @Column({ type: 'json', nullable: true })
  metadata: {
    colorPalette?: string[]; // 主色调
    blurHash?: string;       // 模糊哈希
    dominantColor?: string;  // 主色
  };

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}