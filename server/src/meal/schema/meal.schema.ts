import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "../../authentication/schema/user.schema";

export enum Category {
  AFRICAN_SOUPS = 'African Soups',
  SALADS = 'Salads',
  SANDWICHES = 'Sandwiches',
  PASTA = 'Pasta',
  PASTRIES = 'Pastries',
  DRINKS = 'Drinks'
}

@Schema({
  timestamps:true
})
export class Meal {
  @Prop()
  name:string

  @Prop()
  description:string

  @Prop()
  price:number

  @Prop()
  category: Category

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
  restaurant: string

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User
}

export const MealSchema =  SchemaFactory.createForClass(Meal)