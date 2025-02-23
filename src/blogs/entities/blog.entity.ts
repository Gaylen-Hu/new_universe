import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,OneToOne,ManyToOne, JoinColumn,ManyToMany, JoinTable} from 'typeorm';
import { Tag } from '../../tag/entities/tag.entity';
import { BlogStats } from './blog-stats.entity';

@Entity('blogs')
export class Blog {
    @PrimaryGeneratedColumn({ type: 'bigint', comment: '博客ID' })
    blog_id: number;
    
    @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '博客标题' })
    title: string;
    
    @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '博客作者' })
    author: string;

    @Column({ type: 'text', nullable: false, comment: '博客内容' })
    content: string;

    @ManyToMany(() => Tag, { cascade: true })
    @JoinTable()
    tags: Tag[];

    @Column({ type: 'text', nullable: true, comment: '博客摘要' })
    summary: string;

    @Column({ type: 'varchar', length: 255, nullable: true, default: '', comment: '博客关键词' })
    keywords: string;

    @Column({ type: 'varchar', length: 255, nullable: true, default: '', comment: '博客封面图' })
    cover: string;


    @Column({ type: 'varchar', length: 255, nullable: false, unique: true, comment: '文章唯一标识符' })
    slug: string;

    @OneToOne(() => BlogStats, { cascade: true })
    @JoinColumn()
    stats: BlogStats;

    @Column({ 
        type: 'enum', 
        enum: ['draft', 'published', 'archived'], 
        default: 'draft', 
        comment: '状态' 
    })
    status: 'draft' | 'published' | 'archived';
   

    @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '语言' })
    lang: string;
    @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '创建者' })
    create_by: string;

    @CreateDateColumn({ type: 'datetime', comment: '创建时间' })
    create_time: Date;

    @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '更新者' })
    update_by: string;

    @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '更新时间' })
    update_time: Date | null;
    
}
