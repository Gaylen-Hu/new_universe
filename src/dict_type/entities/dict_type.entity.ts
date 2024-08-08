import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('sys_dict_type')
export class DictType {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'dict_id' })
    dictId: number;

    @Column({ type: 'varchar', length: 100, name: 'dict_name', comment: '字典名称' })
    dictName: string;

    @Column({ type: 'varchar', length: 100, name: 'dict_type', comment: '字典类型' })
    dictType: string;

    @Column({ type: 'char', length: 1, name: 'status', comment: '状态（0正常 1停用）' })
    status: string;

    @Column({ type: 'varchar', length: 500, name: 'remark', default: null, comment: '备注' })
    remark: string;

    @Column({ type: 'varchar', length: 64, name: 'create_by', default: '', comment: '创建者' })
    createBy: string;

    @CreateDateColumn({ type: 'datetime', name: 'create_time' })
    createTime: Date;

    @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '更新者' })
  update_by: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '更新时间' })
  update_time: Date | null;

}
