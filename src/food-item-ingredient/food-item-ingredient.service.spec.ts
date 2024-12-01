import { Test, TestingModule } from '@nestjs/testing';
import { FoodItemIngredientService } from './food-item-ingredient.service';

describe('FoodItemIngredientService', () => {
  let service: FoodItemIngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodItemIngredientService],
    }).compile();

    service = module.get<FoodItemIngredientService>(FoodItemIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
