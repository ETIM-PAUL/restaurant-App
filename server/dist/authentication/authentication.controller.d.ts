import { Request, Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from './dto/login.dto';
import { CreateUserDto } from './dto/user-signup.dto';
import { User } from './schema/user.schema';
export declare class AuthenticationController {
    private authService;
    constructor(authService: AuthenticationService);
    signup(createUserDto: CreateUserDto): Promise<{
        token: string;
    }>;
    getUsers(): Promise<User[]>;
    getUser(id: string): Promise<User>;
    login(response: Response, request: Request, loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    logout(response: Response): Promise<Response<any, Record<string, any>>>;
}
