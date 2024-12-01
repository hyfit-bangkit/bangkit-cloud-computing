import { Test, TestingModule } from '@nestjs/testing';
import { FoodScanHistoryController } from './food-scan-history.controller';

describe('FoodScanHistoryController', () => {
  let controller: FoodScanHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodScanHistoryController],
    }).compile();

    controller = module.get<FoodScanHistoryController>(FoodScanHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
