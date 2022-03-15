import { IsEnum, IsNumber, IsString, IsNotEmpty, IsEmpty } from "class-validator"
import { User } from "../../authentication/schema/user.schema"
import { Category } from "../schema/meal.schema"

export class CreateMealDto {
  @IsNotEmpty()
  @IsString()
  readonly name:string
  
  @IsNotEmpty()
  @IsString()
  readonly description:string


  @IsNotEmpty()
  @IsNumber()
  readonly price:number
  
  @IsNotEmpty()
  @IsEnum(Category, { message: "Please enter correct category for this meal"})
  readonly category: Category
  
  @IsNotEmpty()
  @IsString()
  readonly restaurant:string
  
  @IsEmpty({message: 'You cant provide a user ID'})
  readonly user:User

}

