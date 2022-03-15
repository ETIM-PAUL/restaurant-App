import * as mongoose from 'mongoose';
import { User } from '../../authentication/schema/user.schema';
import { Meal } from '../../meal/schema/meal.schema';
import { Order } from '../../order/schema/order.schema';
export declare class Location {
    type: string;
    coordinates: number[];
    formattedAddress: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
}
export declare enum Category {
    Fast_Food = "Fast Food",
    Cafe = "Cafe",
    Dinning = "Dinning",
    Cuisine_Restaurant = "Cuisines Restaurants",
    Seafood_Restaurant = "Seaside Restaurants"
}
export declare class Restaurant {
    name: string;
    description: string;
    officialChef: string;
    reservations: boolean;
    orderOut: boolean;
    email: string;
    contactNo: number;
    address: string;
    category: Category;
    images?: object[];
    location?: Location;
    menu?: Meal[];
    order?: Order[];
    user: User;
}
export declare const RestaurantSchema: mongoose.Schema<mongoose.Document<Restaurant, any, any>, mongoose.Model<mongoose.Document<Restaurant, any, any>, any, any, any>, any, any>;
