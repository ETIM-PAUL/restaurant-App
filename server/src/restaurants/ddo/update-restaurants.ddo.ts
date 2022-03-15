
import {
  IsString,
  IsBoolean,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  IsOptional,
  IsEmpty,
} from 'class-validator';
import { User } from 'src/authentication/schema/user.schema';
import { Category } from '../schemas/restaurants.schema';

export class UpdateRestaurantDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly officialChef: string;

  @IsBoolean({
    message: 'Please indicate if your restaurant allows reservations',
  })
  @IsOptional()
  readonly reservations: boolean;

  @IsBoolean({
    message: 'Please indicate if your restaurant takes external orders',
  })
  @IsOptional()
  readonly orderOut: boolean;

  @IsEmail({}, { message: 'Please enter correct email address' })
  @IsOptional()
  readonly email: string;

  @IsPhoneNumber('NG')
  @IsOptional()
  readonly contactNo: number;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsEnum(Category, { message: 'Please enter correct category' })
  @IsOptional()
  readonly category: Category;

  @IsEmpty({message: "You cannot provide the id"})
  @IsOptional()
  readonly user: User
}
