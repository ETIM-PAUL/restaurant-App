import { User } from "src/authentication/schema/user.schema";
import { Status } from "../schema/order.schema";
export declare class UpdateOrderDto {
    readonly name: string;
    readonly portions: number;
    readonly amount: number;
    readonly description: string;
    readonly status: Status;
    readonly restaurant: string;
    readonly meal: string;
    readonly user: User;
}
