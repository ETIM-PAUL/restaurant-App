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
exports.RestaurantsController = void 0;
const common_1 = require("@nestjs/common");
const create_restaurants_ddo_1 = require("./ddo/create-restaurants.ddo");
const update_restaurants_ddo_1 = require("./ddo/update-restaurants.ddo");
const restaurants_service_1 = require("./restaurants.service");
const platform_express_1 = require("@nestjs/platform-express");
const passport_1 = require("@nestjs/passport");
const current_user_decorator_1 = require("../authentication/decorators/current-user-decorator");
const user_schema_1 = require("../authentication/schema/user.schema");
const roles_guard_1 = require("../authentication/guards/roles.guard");
const roles_decorator_1 = require("../authentication/decorators/roles.decorator");
let RestaurantsController = class RestaurantsController {
    constructor(restaurantsService) {
        this.restaurantsService = restaurantsService;
    }
    async getAllRestaurants(query) {
        return this.restaurantsService.findAll(query);
    }
    async createRestaurant(restaurant, user) {
        return this.restaurantsService.create(restaurant, user);
    }
    async getRestaurant(id) {
        return this.restaurantsService.findById(id);
    }
    async getOrdersByUser(id) {
        return this.restaurantsService.findRestaurantForUser(id);
    }
    async updateRestaurant(id, restaurant, user) {
        const res = await this.restaurantsService.findById(id);
        if (res.user.toString() !== user._id.toString()) {
            throw new common_1.ForbiddenException("You are not the owner of this Restaurant");
        }
        const filterProps = await this.restaurantsService.findById(id);
        (function () {
            Object.keys(restaurant).forEach((key) => (restaurant[key] === filterProps[key] || restaurant[key] === '') && delete restaurant[key]);
        })();
        return this.restaurantsService.updateById(id, restaurant);
    }
    async deleteRestaurant(id, user) {
        const restaurant = await this.restaurantsService.findById(id);
        if (restaurant.user.toString() !== user._id.toString()) {
            throw new common_1.ForbiddenException("You are not the owner of this restaurant");
        }
        const imageDelete = await this.restaurantsService.deleteImages(restaurant.images);
        if (imageDelete) {
            this.restaurantsService.deleteById(id);
            return {
                deleted: true,
            };
        }
        else {
            return {
                deleted: true,
            };
        }
    }
    async deleteRetaurantImages(id) {
        const restaurant = await this.restaurantsService.findById(id);
        const imageDelete = await this.restaurantsService.deleteImagesInDB(id);
        if (imageDelete) {
            this.restaurantsService.deleteImages(restaurant.images);
            return {
                deleted: true,
            };
        }
        else {
            return {
                deleted: true,
            };
        }
    }
    async uploadedFiles(id, files) {
        await this.restaurantsService.findById(id);
        const res = await this.restaurantsService.uploadImages(id, files);
        return res;
    }
    async review(id, review, user) {
        await this.restaurantsService.findById(id);
        const res = await this.restaurantsService.review(id, review, user);
        return res;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "getAllRestaurants", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("admin", "owner"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_restaurants_ddo_1.CreateRestaurantDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "createRestaurant", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "getRestaurant", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "getOrdersByUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("admin", "owner"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_restaurants_ddo_1.UpdateRestaurantDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "updateRestaurant", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("owner", "admin"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "deleteRestaurant", null);
__decorate([
    (0, common_1.Delete)('/image-delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "deleteRetaurantImages", null);
__decorate([
    (0, common_1.Put)('upload/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 2)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "uploadedFiles", null);
__decorate([
    (0, common_1.Put)('reviews/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("user"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_restaurants_ddo_1.UpdateRestaurantDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], RestaurantsController.prototype, "review", null);
RestaurantsController = __decorate([
    (0, common_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService])
], RestaurantsController);
exports.RestaurantsController = RestaurantsController;
//# sourceMappingURL=restaurants.controller.js.map