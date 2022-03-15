/// <reference types="multer" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose" />
import { CreateRestaurantDto } from './ddo/create-restaurants.ddo';
import { UpdateRestaurantDto } from './ddo/update-restaurants.ddo';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurants.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { User } from 'src/authentication/schema/user.schema';
export declare class RestaurantsController {
    private restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    getAllRestaurants(query: ExpressQuery): Promise<Restaurant[]>;
    createRestaurant(restaurant: CreateRestaurantDto, user: User): Promise<Restaurant>;
    getRestaurant(id: string): Promise<Restaurant>;
    updateRestaurant(id: string, restaurant: UpdateRestaurantDto, user: User): Promise<Restaurant>;
    deleteRestaurant(id: string, user: User): Promise<{
        deleted: boolean;
    }>;
    uploadedFiles(id: string, files: Array<Express.Multer.File>): Promise<import("mongoose").Document<unknown, any, Restaurant> & Restaurant & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
