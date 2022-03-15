import { User } from "../../authentication/schema/user.schema";
import { Category } from "../schema/meal.schema";
export declare class UpdateMealDto {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly category: Category;
    readonly restaurant: string;
    readonly user: User;
}
