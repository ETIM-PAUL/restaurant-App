import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "../../authentication/schema/user.schema";

export enum Status {
  Pending="Pending",
  Ongoing="Ongoing",
  Completed="Completed",
  Delivered="Delivered",
}
@Schema({
  timestamps:true
})
export class Order {
  @Prop()
  name:string

  @Prop()
  portions:number

  @Prop()
  description:string

  @Prop()
  status:Status

  @Prop()
  amount:number
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Meal'})
  meal: string

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
  restaurant: string


  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User
}

export const OrderSchema =  SchemaFactory.createForClass(Order)