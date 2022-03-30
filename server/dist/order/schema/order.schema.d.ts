import * as mongoose from "mongoose";
import { User } from "../../authentication/schema/user.schema";
export declare enum Status {
    Pending = "Pending",
    Ongoing = "Ongoing",
    Completed = "Completed",
    Delivered = "Delivered"
}
export declare class Order {
    name: string;
    portions: number;
    description: string;
    status: Status;
    amount: number;
    meal: string;
    restaurant: string;
    user: User;
}
export declare const OrderSchema: mongoose.Schema<mongoose.Document<Order, any, any>, mongoose.Model<mongoose.Document<Order, any, any>, any, any, any>, any, any>;
