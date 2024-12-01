import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { FoodItem } from '../food-items/food-items.entity';

@Entity('food_scan_history')
export class FoodScanHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => FoodItem, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'food_item_id' })
  foodItem: FoodItem;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  scanned_at: Date;
}
