import { Category } from '../schemas/restaurants.schema';
export declare class RestaurantDto {
    name: string;
    description: string;
    officialChef: string;
    reservations: boolean;
    orderOut: boolean;
    email: string;
    contactNo: number;
    address: string;
    category: Category;
}
