import { User } from '../../users/entities/user.entity';
import { UserRolType } from '../../common/enums/user_roles.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: UserRolType, default: UserRolType.PERSON })
  name: UserRolType;

  @OneToMany(() => User, (user) => user.role)
  user: User[];
}
