import { Module } from '@nestjs/common';
import { FoodScanHistoryService } from './food-scan-history.service';
import { FoodScanHistoryController } from './food-scan-history.controller';

@Module({
  providers: [FoodScanHistoryService],
  controllers: [FoodScanHistoryController]
})
export class FoodScanHistoryModule {}
