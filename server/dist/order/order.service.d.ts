import mongoose from 'mongoose';
import { User } from 'src/authentication/schema/user.schema';
import { Meal } from 'src/meal/schema/meal.schema';
import { Restaurant } from 'src/restaurants/schemas/restaurants.schema';
import { Order } from './schema/order.schema';
export declare class OrderService {
    private orderModel;
    private restaurantModel;
    private mealModel;
    constructor(orderModel: mongoose.Model<Order>, restaurantModel: mongoose.Model<Restaurant>, mealModel: mongoose.Model<Meal>);
    findAll(): Promise<Order[]>;
    findOrderForRestaurant(id: string): Promise<Order[]>;
    findOrderForMeal(id: string): Promise<Order[]>;
    findOrderById(id: string): Promise<Order>;
    create(order: Order, user: User): Promise<Order>;
}
