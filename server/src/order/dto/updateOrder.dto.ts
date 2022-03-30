import { User } from "src/authentication/schema/user.schema"
import { IsString, IsEnum, IsNumber, IsOptional, IsEmpty, IsNotEmpty } from "class-validator"
import {Status} from "../schema/order.schema"

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  readonly name:string

  @IsOptional()
  @IsNumber()
  readonly portions:number
  
  @IsOptional()
  @IsNumber()
  readonly amount:number
  
  @IsOptional()
  @IsString()
  readonly description:string

  @IsOptional()
  @IsEnum(Status, { message: 'Please enter correct status' })
  readonly status:Status
  
  @IsOptional()
  @IsString()
  readonly restaurant:string

  @IsOptional()
  @IsString()
  readonly meal:string
  
  @IsEmpty({message: 'You cant provide a user ID'})
  readonly user:User
}

