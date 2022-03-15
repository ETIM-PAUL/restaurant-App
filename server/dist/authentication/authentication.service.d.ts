import mongoose from 'mongoose';
import { CreateUserDto } from './dto/user-signup.dto';
import { User } from './schema/user.schema';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthenticationService {
    private userModel;
    private jwtService;
    constructor(userModel: mongoose.Model<User>, jwtService: JwtService);
    createUser(createUserDto: CreateUserDto): Promise<{
        token: string;
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        token: string;
        userdetails: Object;
    }>;
}
