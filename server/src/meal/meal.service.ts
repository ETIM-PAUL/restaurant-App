import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meal } from './schema/meal.schema';
import * as mongoose from 'mongoose'
import { Restaurant } from '../restaurants/schemas/restaurants.schema';
import { User } from '../authentication/schema/user.schema';


@Injectable()
export class MealService {
  constructor(@InjectModel(Meal.name)
  private mealModel: mongoose.Model<Meal>,
  @InjectModel(Restaurant.name)
  private restaurantModel: mongoose.Model<Restaurant>
  )
  {}

  //Get all meals
  async findAll(): Promise<Meal[]> {
    const meals = await this.mealModel.find()
    return meals
  }

  //Get all meals of restaurant
  async findMealsForRestaurant(id: string): Promise<Meal[]> {
    const meals = await this.mealModel.find({ restaurants:id });
    return meals
  }

  //Get Meal By Id
  async findMealById(id: string): Promise<Meal>{
    const isValid = mongoose.isValidObjectId(id);

    if(!isValid){
      throw new BadRequestException("Wrong mongoose ID error")
    }
    
    const meal = await this.mealModel.findById(id)

    if(!meal) {
      throw new NotFoundException("Meal Not Found")
    }

    return meal
  }

  //create a new meal
  async create(meal: Meal, user: User): Promise<Meal> {
    
    const data = Object.assign(meal, {user: user._id })
    
    const id = (meal.restaurant)
    const idValid = mongoose.isValidObjectId(id);
    if (!idValid) {
      throw new BadRequestException(
        'Wrong mongoose ID Error. Please enter valid ID',
      );
    }
    //Saving meal ID in the restaurant menu
    const restaurant = await this.restaurantModel.findById(id)
    console.log(restaurant)
    if(!restaurant){
      throw new NotFoundException("Restaurant doesn't exist")
    }
   
    // Check ownership of the restaurant
    if (restaurant.user.toString() ! == user._id) {
      throw new ForbiddenException('You cannot add meal to this Restaurant')
    }

    const mealCreated = await this.mealModel.create(data);

    
    restaurant.menu.push(mealCreated.id);
    await restaurant.save();

    return mealCreated;
  }

  //Update meal by id
  async updateById(id:string, meal: Meal): Promise<Meal>{
    return await this.mealModel.findByIdAndUpdate(id, meal, {
      new: true,
      runValidators: true
    })
  }

}
