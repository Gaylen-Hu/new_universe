import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sys_contact')
export class Contact {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'contact_id' })
    contactId: number;

    @Column({ type: 'varchar', length: 255, name: 'name', default: '', comment: '姓名' })
    name: string;

    @Column({ type: 'varchar', length: 255, name: 'email', default: '', comment: '邮箱' })
    email: string;

    @Column({ type: 'varchar', length: 255, name: 'subject', default: '', comment: '标题' })
    subject: string;

    @Column({ type: 'text', name: 'message',  comment: '消息' })
    message: string;

    @CreateDateColumn({ type: 'datetime', name: 'create_time' })
    createTime: Date;
}
