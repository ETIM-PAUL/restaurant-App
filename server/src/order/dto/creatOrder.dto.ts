import { IsString, IsNotEmpty, IsEmpty, IsBoolean, IsEnum, IsNumber } from "class-validator"
import { User } from "../../authentication/schema/user.schema"
import {Status} from "../schema/order.schema"

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  readonly name:string

  @IsNotEmpty()
  @IsNumber()
  readonly portions:number
  
  @IsNotEmpty()
  @IsString()
  readonly description:string

  @IsNotEmpty()
  @IsEnum(Status, { message: 'Please enter correct status' })
  readonly status:Status
  
  @IsNotEmpty()
  @IsString()
  readonly restaurant:string

  @IsNotEmpty()
  @IsString()
  readonly meal:string
  
  @IsEmpty({message: 'You cant provide a user ID'})
  readonly user:User

}

