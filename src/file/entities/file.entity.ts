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

  @Column()
  url: string;

  @Column()
  bucket: string;

  @Column()
  key: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}