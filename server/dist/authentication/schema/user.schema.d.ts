/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { Document } from 'mongoose';
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user",
    OWNER = "owner"
}
export declare class User extends Document {
    name: string;
    email: string;
    password: string;
    contactNo: number;
    address: string;
    role: UserRole;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any>, any, any>;
