import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('genders')
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;
}
