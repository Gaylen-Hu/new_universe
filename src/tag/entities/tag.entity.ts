import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,ManyToMany } from 'typeorm';
import { Blog } from '../../blogs/entities/blog.entity';

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn({ comment: '标签ID' })
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true, comment: '标签名称' })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true, comment: '标签描述' })
    description: string;



    @Column({
        type: 'enum',
        enum: ['active', 'disabled'],
        default: 'active',
        comment: '标签状态',
    })
    status: 'active' | 'disabled';

    @Column({ type: 'int', default: 0, comment: '排序值' })
    sort_order: number;

    @Column({ type: 'varchar', length: 20, nullable: true, comment: '标签样式类' })
    class: string;

    @CreateDateColumn({ type: 'datetime', comment: '创建时间' })
    create_time: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '最后更新时间' })
    update_time: Date | null;

    @ManyToMany(() => Blog, blog => blog.tags)
    blogs: Blog[];
}
