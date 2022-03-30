/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserArn } from 'aws-sdk/clients/servicecatalog';
import { Query } from 'express-serve-static-core';
import * as mongoose from 'mongoose';
import { Meal } from 'src/meal/schema/meal.schema';
import { Order } from 'src/order/schema/order.schema';
import { User } from '..//authentication/schema/user.schema';
import MAPFeature from '../utils/mapFeat';
import { Restaurant } from './schemas/restaurants.schema';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
    @InjectModel(Order.name)
    private orderModel: mongoose.Model<Order>,
    @InjectModel(Meal.name)
    private mealModel: mongoose.Model<Meal>,
  ) {}

  //Get all Restaurants
  async findAll(query: Query): Promise<Restaurant[]> {
    const restaurantsPerPage = 30;
    const currentPage = Number(query.page) || 1;
    const skip = restaurantsPerPage * (currentPage - 1);
    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const restaurants = await this.restaurantModel
      .find({ ...keyword })
      .limit(restaurantsPerPage)
      .skip(skip);
    return restaurants;
  }

  //Get restaurant for user
  async findRestaurantForUser(id: string): Promise<Restaurant[]> {
    const isValid = mongoose.isValidObjectId(id);

    if(!isValid){
      throw new BadRequestException("Wrong mongoose ID error")
    }
    const restaurant = await this.restaurantModel.find({ user:id });
    const rest = await this.restaurantModel.findOne({ restaurant });
    return (restaurant)
  }

  //Create new Restaurant
  async create(restaurant: Restaurant, user: User): Promise<Restaurant> {
      const location = await MAPFeature.setRestaurantGeoLocation(
        restaurant.address,
      );
      const data = Object.assign(restaurant, {user:user._id, location });

      const findRes = await this.restaurantModel.find()
      const names = findRes.map(x => x.name)
      const restOwners = findRes.map(x => x.user)
      const email = findRes.map(x => x.email)
      const chefs = findRes.map(x => x.officialChef)
      const owners = restOwners.toString()
      
      if(owners.includes(user._id.toString())){
        throw new ConflictException("You already are a Restaurant Owner")
      }
      if(names.includes(data.name)){
        throw new ConflictException("Restaurant already exist")
      } if (chefs.includes(data.officialChef)) {
        throw new ConflictException(" Chef already employed by another Restaurant")
      } if( email.includes(data.email)){
        throw new ConflictException("A Restaurant already as this email listed as its official email")
      }
      const res = await this.restaurantModel.create(data);
      return res;
      
    }
  

  //Get A Restaurant by ID
  async findById(id: string): Promise<Restaurant> {
    const idValid = mongoose.isValidObjectId(id);
    if (!idValid) {
      throw new BadRequestException(
        'Wrong mongoose ID Error. Please enter valid ID',
      );
    }
    const restaurant = await this.restaurantModel.findById(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  //Update A Restuarant by ID
  async updateById(id: string, restaurant: Restaurant): Promise<Restaurant> {
    const location = await MAPFeature.setRestaurantGeoLocation(
      restaurant.address,
    );
    
    const findRes = await this.restaurantModel.find()  
    const names = findRes.map(x => x.name)
    const email = findRes.map(x => x.email)
    const chefs = findRes.map(x => x.officialChef)
   
    
    if(names.includes(restaurant.name)){
      throw new ConflictException("Restaurant with this name already exist")
    } if (chefs.includes(restaurant.officialChef)) {
      throw new ConflictException(" Chef already employed by another Restaurant")
    } if( email.includes(restaurant.email)){
      throw new ConflictException("A Restaurant already as this email listed as its official email")
    }

    const data = Object.assign(restaurant, {location });
    return await this.restaurantModel.findByIdAndUpdate( id, data,{
      new: true,
      runValidators: true,
    });
  }

   //Add a review to A Restuarant
   async review(id: string, restaurant: Restaurant, user:User): Promise<Restaurant> {
    const {name} = user
    const data = Object.assign(restaurant, {user:user.name});
    const findRest = await this.restaurantModel.findById(id)
    findRest.reviews.push(data)
    findRest.save()

    return restaurant
  }

  //Delete A Restaurant by ID
  async deleteById(id: string): Promise<Restaurant> {
    const findRest = await this.restaurantModel.findById(id);
    const restMeals = findRest.menu.map(x=> x)
    const restOrders = findRest.order.map(x=> x)
    for (let index = 0; index < restMeals.length; index++) {
      const meal = await this.mealModel.findByIdAndDelete(restMeals);
    }
    for (let index = 0; index < restOrders.length; index++) {
      const meal = await this.orderModel.findByIdAndDelete(restOrders);
    }
    const rest = await this.restaurantModel.findByIdAndDelete(id);
    // const rest = await this.restaurantModel.findByIdAndDelete(id);
    return await this.restaurantModel.findByIdAndDelete(id);
  }

  //Upload Images
  async uploadImages(id, files) {
    const images = await MAPFeature.upload(files);
    const restaurant = await this.restaurantModel.findByIdAndUpdate(
      id,
      {
        // eslint-disable-next-line @typescript-eslint/ban-types
        images: images as Object[],
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return restaurant;
  }

  //Delete Images in s3
  async deleteImages(images) {
    if (images.length >= 0) return true;
    const res = await MAPFeature.deleteImages(images);
    return res;
  }

  //delete image in database
  async deleteImagesInDB(id) {
    const img = await this.restaurantModel.findById(id)
    const imgArray = img.images
    // if (img.images.length >= 0) return true;
    const res = await this.restaurantModel.updateOne({_id:img._id.toString()}, {
      $pop:{images: 1}
    });
    return res;
  }

}
