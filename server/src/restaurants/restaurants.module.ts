import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { MealModule } from 'src/meal/meal.module';
import { OrderModule } from 'src/order/order.module';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

import { RestaurantSchema } from './schemas/restaurants.schema';

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([
      { name: 'Restaurant', schema: RestaurantSchema },     
    ]),
    forwardRef(() => OrderModule),
    forwardRef(() => MealModule),
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  exports: [MongooseModule]
})
export class RestaurantsModule {}
