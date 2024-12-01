import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FoodItem } from '../food-items/food-items.entity';
import { Ingredient } from '../ingredients/ingredients.entity';

@Entity('food_item_ingredients')
export class FoodItemIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FoodItem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'food_item_id' })
  foodItem: FoodItem;

  @ManyToOne(() => Ingredient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @Column({ length: 50 })
  quantity: string;
}
