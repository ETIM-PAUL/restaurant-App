import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/authentication/schema/user.schema';
import { Meal } from 'src/meal/schema/meal.schema';
import { Restaurant } from 'src/restaurants/schemas/restaurants.schema';
import { Order } from './schema/order.schema';

@Injectable()
export class OrderService {
  constructor(
  @InjectModel(Order.name)
  private orderModel: mongoose.Model<Order>,
  @InjectModel(Restaurant.name)
  private restaurantModel: mongoose.Model<Restaurant>,
  @InjectModel(Meal.name)
  private mealModel: mongoose.Model<Meal>
  )
  {}

    //Get all order
    async findAll(): Promise<Order[]> {
      const orders = await this.orderModel.find()
      return orders
    }
  
    //Get all order of restaurant
    async findOrderForRestaurant(id: string): Promise<Order[]> {
      const orders = await this.orderModel.find({ restaurants:id });
      return orders
    }

    //Get all order of meal
    async findOrderForMeal(id: string): Promise<Order[]> {
      const orders = await this.orderModel.find({ meal:id });
      return orders
    }
  
    //Get order By Id
    async findOrderById(id: string): Promise<Order>{
      const isValid = mongoose.isValidObjectId(id);
  
      if(!isValid){
        throw new BadRequestException("Wrong mongoose ID error")
      }
      
      const order = await this.orderModel.findById(id)
  
      if(!order) {
        throw new NotFoundException("Order Not Found")
      }
  
      return order
    }

  //Create A Order for a meal in a restaurant
  async create(order: Order, user: User): Promise<Order> {
    const data = Object.assign(order, {user: user._id })

    const id = (order.restaurant)
    const idValid = mongoose.isValidObjectId(id);
    if (!idValid) {
      throw new BadRequestException(
        'Wrong Restaurant mongoose ID Error. Please enter valid ID',
      );
    }

    const mid = (order.meal)
    const midValid = mongoose.isValidObjectId(mid);
    if (!midValid) {
      throw new BadRequestException(
        'Wrong Meal mongoose ID Error. Please enter valid ID',
      );
    }

    const restaurant = await this.restaurantModel.findById(order.restaurant)
    
    if(!restaurant){
      throw new NotFoundException("Meal doesn't exist")
    }

    const findMeal = await this.mealModel.findById(order.meal)
    
    if(!findMeal){
      throw new NotFoundException("Restaurant doesn't exist")
    }
   
    // Check ownership of the restaurant
    if (restaurant.orderOut === false) {
      throw new ForbiddenException('This Restaurant doesnt take external orders')
    }

    const orderCreated = await this.orderModel.create(data);

    
    restaurant.order.push(orderCreated.id);
    await restaurant.save();

    return orderCreated;
  }
}
