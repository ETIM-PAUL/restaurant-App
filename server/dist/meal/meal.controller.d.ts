import { User } from '../authentication/schema/user.schema';
import { CreateMealDto } from './dto/createMeal.dto';
import { UpdateMealDto } from './dto/updateMeal.dto';
import { MealService } from './meal.service';
import { Meal } from './schema/meal.schema';
export declare class MealController {
    private mealService;
    constructor(mealService: MealService);
    getAllMeals(): Promise<Meal[]>;
    getMealsByRestaurant(id: string): Promise<Meal[]>;
    getMealById(id: string): Promise<Meal>;
    createMeal(createMealDto: CreateMealDto, user: User): Promise<Meal>;
    updateMeal(updateMealDto: UpdateMealDto, id: string, user: User): Promise<Meal>;
}
