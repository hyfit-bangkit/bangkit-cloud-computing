import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('food_items')
export class FoodItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  name: string;

  @Column()
  calories: number;

  @Column({ nullable: true })
  protein: number;

  @Column({ nullable: true })
  fats: number;

  @Column({ nullable: true })
  carbohydrates: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
