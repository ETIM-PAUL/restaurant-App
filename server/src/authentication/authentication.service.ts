import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/user-signup.dto';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login.dto';
import MAPFeature from 'src/utils/mapFeat';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  //get all users
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find()
    return users
  }

  //get all users
  async findOne(id:string): Promise<User> {
    const isValid = mongoose.isValidObjectId(id);

    if(!isValid){
      throw new BadRequestException("Wrong mongoose ID error")
    }
    
    const user = await this.userModel.findById(id)

    if(!user) {
      throw new NotFoundException("User Not Found")
    }

    return user
  }

  // Register User
  async createUser(createUserDto: CreateUserDto): Promise<{ token: string }> {
    const { name, email, password, address, contactNo,role } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        contactNo,
        address,
        role,
      });
      const token = await MAPFeature.assignJwtToken(user.id, this.jwtService);

      return { token };
    } catch (error) {
      //Handle Duplicate Email
      if (error.code === 11000) {
        throw new ConflictException('Email already registered');
      }
      console.log(error);
    }
  }

  //Login User
  async loginUser(loginUserDto: LoginUserDto): Promise<{ token: string, userdetails:Object }> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedException('No user Found');
    }

    //Check if password is correct
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email account or password');
    }

    user.password =undefined
    const userdetails = user 
    const token = await MAPFeature.assignJwtToken(user.id, this.jwtService);
    return ({ token,userdetails });
    

  }

  //logoutUser
  
}
