import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Blog } from './blog.entity';

@Entity('blog_stats')
export class BlogStats {
    @PrimaryGeneratedColumn({ comment: '统计ID' })
    id: number;

    @ManyToOne(() => Blog, (blog) => blog.stats, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'blog_id' })
    blog: Blog;

    @Column({ type: 'int', default: 0, comment: '浏览量' })
    views_count: number;

    @Column({ type: 'int', default: 0, comment: '点赞数' })
    likes_count: number;

    @Column({ type: 'int', default: 0, comment: '评论数' })
    comments_count: number;

    @Column({ type: 'int', default: 0, comment: '分享数' })
    shares_count: number;

    @Column({ type: 'int', default: 0, comment: '收藏数' })
    favorites_count: number;

    @Column({ type: 'date', nullable: true, comment: '统计周期' })
    statistic_period: Date | null;

    @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '最后更新时间' })
    last_updated: Date | null;
}
