/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import * as mongoose from 'mongoose';
import { User } from 'src/authentication/schema/user.schema';
import MAPFeature from 'src/utils/mapFeat';
import { Restaurant } from './schemas/restaurants.schema';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  //Get all Restaurants
  async findAll(query: Query): Promise<Restaurant[]> {
    const restaurantsPerPage = 2;
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

  //Create new Restaurant
  async create(restaurant: Restaurant, user: User): Promise<Restaurant> {
      const location = await MAPFeature.setRestaurantGeoLocation(
        restaurant.address,
      );
      const data = Object.assign(restaurant, {user:user._id, location });

      const findRes = await this.restaurantModel.find()
      const names = findRes.map(x => x.name)
      const email = findRes.map(x => x.email)
      const chefs = findRes.map(x => x.officialChef)
      
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
    return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });
  }

  //Delete A Restaurant by ID
  async deleteById(id: string): Promise<Restaurant> {
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

  //Delete Images
  async deleteImages(images) {
    if (images.length === 0) return true;
    const res = await MAPFeature.deleteImages(images);
    return res;
  }
}
