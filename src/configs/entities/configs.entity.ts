import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sys_config')
export class Config {
    @PrimaryGeneratedColumn({ type: 'int', comment: '参数主键' })
    config_id: number;
    
    @Column({ type: 'varchar', length: 100, nullable: false, default: '', comment: '参数名称' })
    config_name: string;
    
    @Column({ type: 'varchar', length: 100, nullable: false, default: '', comment: '参数键名' })
    config_key: string;
    
    @Column({ type: 'varchar', length: 500, nullable: false, default: '', comment: '参数键值' })
    config_value: string;
    
    @Column({ type: 'char', length: 1, nullable: false, default: 'N', comment: '系统内置（Y是 N否）' })
    config_type: string;
    
    @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '创建者' })
    create_by: string;
    
    @CreateDateColumn({ type: 'datetime', comment: '创建时间' })
    create_time: Date;
    
    @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '更新者' })
    update_by: string;
    
    @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '更新时间' })
    update_time: Date | null;
    
    @Column({ type: 'varchar', length: 500, nullable: true, default: null, comment: '备注' })
    remark: string;
}



