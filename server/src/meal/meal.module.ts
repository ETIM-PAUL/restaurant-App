import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { MealSchema } from './schema/meal.schema';

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([
      { name: 'Meal', schema: MealSchema}]),
    RestaurantsModule,
  ],
  controllers: [MealController],
  providers: [MealService],
  exports: [MongooseModule]
  
})
export class MealModule {}
