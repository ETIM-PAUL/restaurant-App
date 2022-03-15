import { User } from 'src/authentication/schema/user.schema';
import { Category } from '../schemas/restaurants.schema';
export declare class CreateRestaurantDto {
    readonly name: string;
    readonly description: string;
    readonly officialChef: string;
    readonly reservations: boolean;
    readonly orderOut: boolean;
    readonly email: string;
    readonly contactNo: number;
    readonly address: string;
    readonly category: Category;
    readonly user: User;
}
