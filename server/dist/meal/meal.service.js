"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const meal_schema_1 = require("./schema/meal.schema");
const mongoose = require("mongoose");
const restaurants_schema_1 = require("../restaurants/schemas/restaurants.schema");
let MealService = class MealService {
    constructor(mealModel, restaurantModel) {
        this.mealModel = mealModel;
        this.restaurantModel = restaurantModel;
    }
    async findAll() {
        const meals = await this.mealModel.find();
        return meals;
    }
    async findMealsForRestaurant(id) {
        const isValid = mongoose.isValidObjectId(id);
        if (!isValid) {
            throw new common_1.BadRequestException("Wrong mongoose ID error");
        }
        const meals = await this.mealModel.find({ restaurant: id });
        return meals;
    }
    async findMealById(id) {
        const isValid = mongoose.isValidObjectId(id);
        if (!isValid) {
            throw new common_1.BadRequestException("Wrong mongoose ID error");
        }
        const meal = await this.mealModel.findById(id);
        if (!meal) {
            throw new common_1.NotFoundException("Meal Not Found");
        }
        return meal;
    }
    async create(meal, user) {
        const data = Object.assign(meal, { user: user._id });
        const id = (meal.restaurant);
        const idValid = mongoose.isValidObjectId(id);
        if (!idValid) {
            throw new common_1.BadRequestException('Wrong mongoose ID Error. Please enter valid ID');
        }
        const restaurant = await this.restaurantModel.findById(id);
        console.log(restaurant);
        if (!restaurant) {
            throw new common_1.NotFoundException("Restaurant doesn't exist");
        }
        if (restaurant.user.toString() !== user._id.toString()) {
            throw new common_1.ForbiddenException('You cannot add meal to this Restaurant');
        }
        const mealCreated = await this.mealModel.create(data);
        restaurant.menu.push(mealCreated.id);
        await restaurant.save();
        return mealCreated;
    }
    async updateById(id, meal) {
        return await this.mealModel.findByIdAndUpdate(id, meal, {
            new: true,
            runValidators: true
        });
    }
    async deleteById(id) {
        const meal = this.mealModel.findById(id);
        const restId = (await meal).restaurant;
        const rest = this.restaurantModel.findById(restId);
        await this.restaurantModel.updateMany({}, { $pull: { menu: id } });
        return await this.mealModel.findByIdAndDelete(id);
    }
};
MealService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(meal_schema_1.Meal.name)),
    __param(1, (0, mongoose_1.InjectModel)(restaurants_schema_1.Restaurant.name)),
    __metadata("design:paramtypes", [mongoose.Model, mongoose.Model])
], MealService);
exports.MealService = MealService;
//# sourceMappingURL=meal.service.js.map