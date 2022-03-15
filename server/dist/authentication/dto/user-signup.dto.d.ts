import { UserRole } from '../schema/user.schema';
export declare class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly contactNo: number;
    readonly address: string;
    readonly role: UserRole;
}
