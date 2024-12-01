import { Test, TestingModule } from '@nestjs/testing';
import { FoodScanHistoryService } from './food-scan-history.service';

describe('FoodScanHistoryService', () => {
  let service: FoodScanHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodScanHistoryService],
    }).compile();

    service = module.get<FoodScanHistoryService>(FoodScanHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
