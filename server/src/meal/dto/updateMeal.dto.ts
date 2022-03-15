import { IsEnum, IsNumber, IsString, IsEmpty, IsOptional } from "class-validator"
import { User } from "../../authentication/schema/user.schema"
import { Category } from "../schema/meal.schema"

export class UpdateMealDto {
  @IsOptional()
  @IsString()
  readonly name:string
  
  @IsOptional()
  @IsString()
  readonly description:string


  @IsOptional()

  @IsNumber()
  readonly price:number
  
  @IsOptional()

  @IsEnum(Category, { message: "Please enter correct category for this meal"})
  readonly category: Category
  
  @IsOptional()

  @IsString()
  readonly restaurant:string
  
  @IsEmpty({message: 'You cant provide a user ID'})
  readonly user:User

}

