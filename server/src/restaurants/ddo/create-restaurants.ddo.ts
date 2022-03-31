import {
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from 'src/authentication/schema/user.schema';
import { Category } from '../schemas/restaurants.schema';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2,{message:"Restaurant Name is too short"})
  @MaxLength(20,{message:"Restaurant Name too long"})
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly officialChef: string;

  @IsNotEmpty()
  @IsBoolean({
    message: 'Please indicate if your restaurant allows reservations',
  })
  readonly reservations: boolean;

  @IsNotEmpty()
  @IsBoolean({
    message: 'Please indicate if your restaurant takes external orders',
  })
  readonly orderOut: boolean;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address' })
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly contactNo: number;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct category' })
  readonly category: Category;

  // @IsEmpty()
  // @IsEnum(Meal, { message: 'Please enter correct Meal Id' })
  // readonly meal: Meal;

  // @IsNotEmpty()
  // @IsEnum(Order, { message: 'Please enter correct Order Id' })
  // readonly order: Order;

  @IsEmpty({message: "You cannot provide the id"})
  readonly user: User;
}