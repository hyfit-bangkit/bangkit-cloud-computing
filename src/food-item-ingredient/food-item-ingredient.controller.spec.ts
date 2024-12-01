import { Test, TestingModule } from '@nestjs/testing';
import { FoodItemIngredientController } from './food-item-ingredient.controller';

describe('FoodItemIngredientController', () => {
  let controller: FoodItemIngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodItemIngredientController],
    }).compile();

    controller = module.get<FoodItemIngredientController>(FoodItemIngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
