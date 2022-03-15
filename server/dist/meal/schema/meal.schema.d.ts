import * as mongoose from "mongoose";
import { User } from "../../authentication/schema/user.schema";
export declare enum Category {
    AFRICAN_SOUPS = "African Soups",
    SALADS = "Salads",
    SANDWICHES = "Sandwiches",
    PASTA = "Pasta",
    PASTRIES = "Pastries",
    DRINKS = "Drinks"
}
export declare class Meal {
    name: string;
    description: string;
    price: number;
    category: Category;
    restaurant: string;
    user: User;
}
export declare const MealSchema: mongoose.Schema<mongoose.Document<Meal, any, any>, mongoose.Model<mongoose.Document<Meal, any, any>, any, any, any>, any, any>;
