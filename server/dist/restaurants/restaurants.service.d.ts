import { Query } from 'express-serve-static-core';
import * as mongoose from 'mongoose';
import { User } from 'src/authentication/schema/user.schema';
import { Restaurant } from './schemas/restaurants.schema';
export declare class RestaurantsService {
    private restaurantModel;
    constructor(restaurantModel: mongoose.Model<Restaurant>);
    findAll(query: Query): Promise<Restaurant[]>;
    create(restaurant: Restaurant, user: User): Promise<Restaurant>;
    findById(id: string): Promise<Restaurant>;
    updateById(id: string, restaurant: Restaurant): Promise<Restaurant>;
    deleteById(id: string): Promise<Restaurant>;
    uploadImages(id: any, files: any): Promise<mongoose.Document<unknown, any, Restaurant> & Restaurant & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteImages(images: any): Promise<unknown>;
}
