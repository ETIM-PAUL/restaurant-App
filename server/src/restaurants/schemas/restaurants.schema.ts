import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { timestamp } from 'rxjs';
import { User } from '../../authentication/schema/user.schema';
import { Meal } from '../../meal/schema/meal.schema';
import { Order} from '../../order/schema/order.schema'

export class Location {
  @Prop({ type: String, enum: ['Point'] })
  type: string;

  @Prop({ index: '2dsphere' })
  coordinates: number[];

  formattedAddress: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

export enum Category {
  FastFood = 'Fast Food',
  Cafe = 'Cafe',
  Dinning = 'Dinning',
  Cuisine = 'Cuisine',
  Seafood = 'Seafood',
}

@Schema({
  timestamps:true
})
export class Restaurant {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  officialChef: string;

  @Prop()
  reservations: boolean;

  @Prop()
  orderOut: boolean;

  @Prop()
  email: string;

  @Prop()
  contactNo: number;

  @Prop()
  address: string;

  @Prop()
  category: Category;

  @Prop()
  images?: object[];

  @Prop({timestamps:true})
  reviews?: object[];

  @Prop([{ type: Object, ref: 'Location' }])
  location?: Location;

  @Prop([ {type: mongoose.Schema.Types.ObjectId, ref: 'Meal'} ])
  menu?:Meal[];

  @Prop([ {type: mongoose.Schema.Types.ObjectId, ref: 'Order'} ])
  order?:Order[];

  @Prop( {type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user:User


}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);