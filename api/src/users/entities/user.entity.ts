import { MedicalReq } from '../../medical_req/entities/medical_req.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../../user_roles/entities/user_role.entity';
import { GenderType } from '../../genders/entities/gender.entity';
import { IdTypeEntity } from '../../id_types/entities/id_type.entity';
import { CompanyArea } from '../../company_area/entities/company_area.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column({ type: 'date', nullable: true })
  birthay_date: Date;

  @Column({ type: 'bigint', unique: true })
  id_number: number;

  @Column({ type: 'date', nullable: true })
  id_exp_date: Date;

  @Column()
  email: string;

  @Column({ type: 'bigint', nullable: true })
  cellphone: number;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  residence_department: string;

  @Column({ nullable: true })
  residence_city: string;

  @Column({ nullable: true })
  residence_address: string;

  @Column({ nullable: true })
  residence_neighborhood: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => MedicalReq, (medical_req) => medical_req.aplicant, {
    eager: true,
    cascade: true,
  })
  medical_req: MedicalReq[];

  @ManyToOne(() => UserRole, (role) => role.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'user_role', referencedColumnName: 'id' })
  role: UserRole;

  @Column()
  user_role: number;

  @ManyToOne(() => GenderType, (gender) => gender.user)
  @JoinColumn({ name: 'user_gender', referencedColumnName: 'id' })
  gender: GenderType;

  @Column()
  user_gender: number;

  @ManyToOne(() => IdTypeEntity, (id_type) => id_type.user)
  @JoinColumn({ name: 'user_id_type', referencedColumnName: 'id' })
  id_type: IdTypeEntity;

  @Column()
  user_id_type: number;

  @ManyToOne(() => CompanyArea, (companyArea) => companyArea.user)
  @JoinColumn({ name: 'company_area', referencedColumnName: 'id' })
  companyArea: CompanyArea;

  @Column({ nullable: true })
  company_area: number;
}
