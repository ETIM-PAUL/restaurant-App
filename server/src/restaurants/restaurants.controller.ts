import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRestaurantDto } from './ddo/create-restaurants.ddo';
import { UpdateRestaurantDto } from './ddo/update-restaurants.ddo';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurants.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/authentication/decorators/current-user-decorator';
import { User } from 'src/authentication/schema/user.schema';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { Roles } from 'src/authentication/decorators/roles.decorator';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  async getAllRestaurants(@Query() query: ExpressQuery): Promise<Restaurant[]> {
    // console.log(user)
    return this.restaurantsService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles("admin","owner")
  async createRestaurant(
    @Body()
    restaurant: CreateRestaurantDto,
    @CurrentUser() user: User
  ): Promise<Restaurant> {
    return this.restaurantsService.create(restaurant, user);
  }

  @Get(':id')
  async getRestaurant(
    @Param('id')
    id: string,
  ): Promise<Restaurant> {
    return this.restaurantsService.findById(id);
  }

  @Get('user/:id')
  async getOrdersByUser(@Param('id') id: string): Promise<Restaurant[]> {
    return this.restaurantsService.findRestaurantForUser(id)
  }

  @Put(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles("admin","owner")
  async updateRestaurant(
    @Param('id')
    id: string,
    @Body()
    restaurant: UpdateRestaurantDto,
    @CurrentUser() user: User,
  ): Promise<Restaurant> {
   const res =  await this.restaurantsService.findById(id);
   if(res.user.toString() !== user._id.toString()) {
     throw new ForbiddenException("You are not the owner of this Restaurant");
   }
   const filterProps = await this.restaurantsService.findById(id);
   (function() {
     Object.keys(restaurant).forEach((key)=> (restaurant[key] === filterProps[key] || restaurant[key] === '') && delete restaurant[key])
   })()
   
    return this.restaurantsService.updateById(id, restaurant);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles("owner","admin")
  async deleteRestaurant(
    @Param('id')
    id: string,
    @CurrentUser() user: User,
  ): Promise<{ deleted: boolean }> {
    const restaurant = await this.restaurantsService.findById(id);

    if(restaurant.user.toString() !== user._id.toString()) {
      throw new ForbiddenException("You are not the owner of this restaurant");
    }
    const imageDelete = await this.restaurantsService.deleteImages(
      restaurant.images,
    );

    if (imageDelete) {
      this.restaurantsService.deleteById(id);
      return {
        deleted: true,
      };
    } else {
      return {
        deleted: true,
      };
    }
  }

  @Delete('/image-delete/:id')
  async deleteRetaurantImages(
    @Param('id') id: string
  ): Promise<{ deleted: boolean }> {
    const restaurant = await this.restaurantsService.findById(id);
    const imageDelete = await this.restaurantsService.deleteImagesInDB(id)
    if (imageDelete) {
      this.restaurantsService.deleteImages(
        restaurant.images,
      );
      return {
        deleted: true,
      };
    } else {
      return {
        deleted: true,
      };
    }
  }

  @Put('upload/:id')
  // @UseGuards(RolesGuard)
  // @Roles("owner","admin")
  @UseInterceptors(FilesInterceptor('files', 2))
  async uploadedFiles(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    await this.restaurantsService.findById(id);

    const res = await this.restaurantsService.uploadImages(id, files);
    return res;
  }

  @Put('reviews/:id')
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles("user")
  async review(
    @Param('id')
    id: string,
    @Body()
    review: UpdateRestaurantDto,
    @CurrentUser() user: User,
  ) {
    await this.restaurantsService.findById(id);

    const res = await this.restaurantsService.review(id,review,user)
    return res;
  }
}
