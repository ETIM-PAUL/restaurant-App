import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { CurrentUser } from '../authentication/decorators/current-user-decorator';
import { User } from '../authentication/schema/user.schema';
import { CreateMealDto } from './dto/createMeal.dto';
import { UpdateMealDto } from './dto/updateMeal.dto';
import { MealService } from './meal.service'
import { Meal } from './schema/meal.schema';

@Controller('meals')
export class MealController {
  constructor(private  mealService: MealService) {}

  @Get()
  async getAllMeals(): Promise<Meal[]> {
return this.mealService.findAll()
  }

  @Get('restaurant/:id')
  async getMealsByRestaurant(@Param('id') id: string): Promise<Meal[]> {
    return this.mealService.findMealsForRestaurant(id)
  }

  @Get(':id')
  async getMealById(@Param('id') id:string): Promise<Meal> {
    return this.mealService.findMealById(id)
  }
  

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles("admin","owner")
  createMeal(
    @Body() createMealDto: CreateMealDto,
    @CurrentUser() user: User
  ): Promise<Meal> {
    return this.mealService.create(createMealDto, user)
  }

  @Put(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles("admin","owner")
  async updateMeal(@Body() updateMealDto: UpdateMealDto, @Param('id') id: string, @CurrentUser() user:User): Promise<Meal> {
    const meal = await this.mealService.findMealById(id);

    if(meal.user.toString() !== user._id.toString()) {
      throw new ForbiddenException("You dont own the Restaurant that has this meal");
  }

  return this.mealService.updateById(id, updateMealDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles("admin","owner")
  async deleteMeal(@Param('id') id: string, @CurrentUser() user:User): Promise<{ deleted: boolean }> {
    const meal = await this.mealService.findMealById(id);
    
    if(meal.user.toString() !== user._id.toString()) {
      throw new ForbiddenException("You dont own the Restaurant that has this meal");
  }

  this.mealService.deleteById(id)
  return {
    deleted: true,
  };
    
  }

}
