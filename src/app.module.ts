import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GenderController } from './gender/gender.controller';
import { GenderService } from './gender/gender.service';
import { GenderModule } from './gender/gender.module';
import { FoodItemsController } from './food-items/food-items.controller';
import { FoodItemsModule } from './food-items/food-items.module';
import { IngredientsService } from './ingredients/ingredients.service';
import { IngredientsModule } from './ingredients/ingredients.module';
import { FoodItemIngredientController } from './food-item-ingredient/food-item-ingredient.controller';
import { FoodItemIngredientService } from './food-item-ingredient/food-item-ingredient.service';
import { FoodItemIngredientModule } from './food-item-ingredient/food-item-ingredient.module';
import { FoodScanHistoryModule } from './food-scan-history/food-scan-history.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    GenderModule,
    FoodItemsModule,
    IngredientsModule,
    FoodItemIngredientModule,
    FoodScanHistoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [join(__dirname, '**/**.entity{.ts,.js}')],
        synchronize: true,
      }),
    }),
  ],
  controllers: [
    GenderController,
    FoodItemsController,
    FoodItemIngredientController,
  ],
  providers: [GenderService, IngredientsService, FoodItemIngredientService],
})
export class AppModule {}
