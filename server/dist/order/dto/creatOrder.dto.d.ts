import { User } from "../../authentication/schema/user.schema";
import { Status } from "../schema/order.schema";
export declare class CreateOrderDto {
    readonly name: string;
    readonly portions: number;
    readonly description: string;
    readonly status: Status;
    readonly restaurant: string;
    readonly meal: string;
    readonly user: User;
}
