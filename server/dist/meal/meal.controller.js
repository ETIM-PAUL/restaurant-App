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
exports.MealController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../authentication/decorators/roles.decorator");
const roles_guard_1 = require("../authentication/guards/roles.guard");
const current_user_decorator_1 = require("../authentication/decorators/current-user-decorator");
const user_schema_1 = require("../authentication/schema/user.schema");
const createMeal_dto_1 = require("./dto/createMeal.dto");
const updateMeal_dto_1 = require("./dto/updateMeal.dto");
const meal_service_1 = require("./meal.service");
let MealController = class MealController {
    constructor(mealService) {
        this.mealService = mealService;
    }
    async getAllMeals() {
        return this.mealService.findAll();
    }
    async getMealsByRestaurant(id) {
        return this.mealService.findMealsForRestaurant(id);
    }
    async getMealById(id) {
        return this.mealService.findMealById(id);
    }
    createMeal(createMealDto, user) {
        return this.mealService.create(createMealDto, user);
    }
    async updateMeal(updateMealDto, id, user) {
        const meal = await this.mealService.findMealById(id);
        if (meal.user.toString() !== user._id.toString()) {
            throw new common_1.ForbiddenException("You dont own the Restaurant that has this meal");
        }
        return this.mealService.updateById(id, updateMealDto);
    }
    async deleteMeal(id, user) {
        const meal = await this.mealService.findMealById(id);
        if (meal.user.toString() !== user._id.toString()) {
            throw new common_1.ForbiddenException("You dont own the Restaurant that has this meal");
        }
        this.mealService.deleteById(id);
        return {
            deleted: true,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MealController.prototype, "getAllMeals", null);
__decorate([
    (0, common_1.Get)('restaurant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MealController.prototype, "getMealsByRestaurant", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MealController.prototype, "getMealById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("admin", "owner"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMeal_dto_1.CreateMealDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], MealController.prototype, "createMeal", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("admin", "owner"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateMeal_dto_1.UpdateMealDto, String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], MealController.prototype, "updateMeal", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("admin", "owner"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], MealController.prototype, "deleteMeal", null);
MealController = __decorate([
    (0, common_1.Controller)('meals'),
    __metadata("design:paramtypes", [meal_service_1.MealService])
], MealController);
exports.MealController = MealController;
//# sourceMappingURL=meal.controller.js.map