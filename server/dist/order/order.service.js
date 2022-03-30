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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const meal_schema_1 = require("../meal/schema/meal.schema");
const restaurants_schema_1 = require("../restaurants/schemas/restaurants.schema");
const order_schema_1 = require("./schema/order.schema");
let OrderService = class OrderService {
    constructor(orderModel, restaurantModel, mealModel) {
        this.orderModel = orderModel;
        this.restaurantModel = restaurantModel;
        this.mealModel = mealModel;
    }
    async findAll() {
        const orders = await this.orderModel.find();
        return orders;
    }
    async findOrderForRestaurant(id) {
        const isValid = mongoose_2.default.isValidObjectId(id);
        if (!isValid) {
            throw new common_1.BadRequestException("Wrong mongoose ID error");
        }
        const orders = await this.orderModel.find({ restaurant: id });
        return orders;
    }
    async findOrdersForUser(id) {
        const isValid = mongoose_2.default.isValidObjectId(id);
        if (!isValid) {
            throw new common_1.BadRequestException("Wrong mongoose ID error");
        }
        const orders = await this.orderModel.find({ user: id });
        const rest = await this.restaurantModel.findOne({ orders });
        return (orders);
    }
    async findOrderForMeal(id) {
        const isValid = mongoose_2.default.isValidObjectId(id);
        if (!isValid) {
            throw new common_1.BadRequestException("Wrong mongoose ID error");
        }
        const orders = await this.orderModel.find({ meal: id });
        return orders;
    }
    async findOrderById(id) {
        const isValid = mongoose_2.default.isValidObjectId(id);
        if (!isValid) {
            throw new common_1.BadRequestException("Wrong mongoose ID error");
        }
        const order = await this.orderModel.findById(id);
        if (!order) {
            throw new common_1.NotFoundException("Order Not Found");
        }
        return order;
    }
    async create(order, user) {
        const data = Object.assign(order, { user: user._id });
        const id = (order.restaurant);
        const idValid = mongoose_2.default.isValidObjectId(id);
        if (!idValid) {
            throw new common_1.BadRequestException('Wrong Restaurant mongoose ID Error. Please enter valid ID');
        }
        const mid = (order.meal);
        const midValid = mongoose_2.default.isValidObjectId(mid);
        if (!midValid) {
            throw new common_1.BadRequestException('Wrong Meal mongoose ID Error. Please enter valid ID');
        }
        const restaurant = await this.restaurantModel.findById(order.restaurant);
        if (!restaurant) {
            throw new common_1.NotFoundException("Meal doesn't exist");
        }
        const findMeal = await this.mealModel.findById(order.meal);
        if (!findMeal) {
            throw new common_1.NotFoundException("Restaurant doesn't exist");
        }
        if (restaurant.orderOut === false) {
            throw new common_1.ForbiddenException('This Restaurant doesnt take external orders');
        }
        const orderCreated = await this.orderModel.create(data);
        restaurant.order.push(orderCreated.id);
        await restaurant.save();
        return orderCreated;
    }
    async deleteById(id) {
        return await this.orderModel.findByIdAndDelete(id);
    }
    async updateById(id, order) {
        return await this.orderModel.findByIdAndUpdate(id, order, {
            new: true,
            runValidators: true
        });
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(restaurants_schema_1.Restaurant.name)),
    __param(2, (0, mongoose_1.InjectModel)(meal_schema_1.Meal.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map