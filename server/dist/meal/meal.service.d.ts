import { Meal } from './schema/meal.schema';
import * as mongoose from 'mongoose';
import { Restaurant } from '../restaurants/schemas/restaurants.schema';
import { User } from '../authentication/schema/user.schema';
export declare class MealService {
    private mealModel;
    private restaurantModel;
    constructor(mealModel: mongoose.Model<Meal>, restaurantModel: mongoose.Model<Restaurant>);
    findAll(): Promise<Meal[]>;
    findMealsForRestaurant(id: string): Promise<Meal[]>;
    findMealById(id: string): Promise<Meal>;
    create(meal: Meal, user: User): Promise<Meal>;
    updateById(id: string, meal: Meal): Promise<Meal>;
}
