import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '../authentication/authentication.module';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { MealModule } from '../meal/meal.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './schema/order.schema';

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema}]),
    RestaurantsModule,
    MealModule,
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
