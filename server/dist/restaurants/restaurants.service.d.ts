import { Query } from 'express-serve-static-core';
import * as mongoose from 'mongoose';
import { Meal } from 'src/meal/schema/meal.schema';
import { Order } from 'src/order/schema/order.schema';
import { User } from '..//authentication/schema/user.schema';
import { Restaurant } from './schemas/restaurants.schema';
export declare class RestaurantsService {
    private restaurantModel;
    private orderModel;
    private mealModel;
    constructor(restaurantModel: mongoose.Model<Restaurant>, orderModel: mongoose.Model<Order>, mealModel: mongoose.Model<Meal>);
    findAll(query: Query): Promise<Restaurant[]>;
    findRestaurantForUser(id: string): Promise<Restaurant[]>;
    create(restaurant: Restaurant, user: User): Promise<Restaurant>;
    findById(id: string): Promise<Restaurant>;
    updateById(id: string, restaurant: Restaurant): Promise<Restaurant>;
    review(id: string, restaurant: Restaurant, user: User): Promise<Restaurant>;
    deleteById(id: string): Promise<Restaurant>;
    uploadImages(id: any, files: any): Promise<mongoose.Document<unknown, any, Restaurant> & Restaurant & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteImages(images: any): Promise<unknown>;
    deleteImagesInDB(id: any): Promise<import("mongodb").UpdateResult>;
}
