import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column('text')
  mediaResources?:  string;


  @Column('text')
  tags?:  string;

  @Column({ 
    type: 'int', 
    default: 0,
    comment: '点赞数' 
  })
  likeCount: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: '发布位置'
  })
  location?: string;

  @Column({
    type: 'varchar',
    length: 10,
    default: 'zh-CN',
    comment: '语言地区编码 (zh-CN/en-US)'
  })
  locale: string;

  @Column({ 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP' 
  })
  createdAt: Date;
}