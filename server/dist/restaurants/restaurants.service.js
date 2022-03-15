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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const mapFeat_1 = require("../utils/mapFeat");
const restaurants_schema_1 = require("./schemas/restaurants.schema");
let RestaurantsService = class RestaurantsService {
    constructor(restaurantModel) {
        this.restaurantModel = restaurantModel;
    }
    async findAll(query) {
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
            .find(Object.assign({}, keyword))
            .limit(restaurantsPerPage)
            .skip(skip);
        return restaurants;
    }
    async create(restaurant, user) {
        const location = await mapFeat_1.default.setRestaurantGeoLocation(restaurant.address);
        const data = Object.assign(restaurant, { user: user._id, location });
        const findRes = await this.restaurantModel.find();
        const names = findRes.map(x => x.name);
        const email = findRes.map(x => x.email);
        const chefs = findRes.map(x => x.officialChef);
        if (names.includes(data.name)) {
            throw new common_1.ConflictException("Restaurant already exist");
        }
        if (chefs.includes(data.officialChef)) {
            throw new common_1.ConflictException(" Chef already employed by another Restaurant");
        }
        if (email.includes(data.email)) {
            throw new common_1.ConflictException("A Restaurant already as this email listed as its official email");
        }
        const res = await this.restaurantModel.create(data);
        return res;
    }
    async findById(id) {
        const idValid = mongoose.isValidObjectId(id);
        if (!idValid) {
            throw new common_1.BadRequestException('Wrong mongoose ID Error. Please enter valid ID');
        }
        const restaurant = await this.restaurantModel.findById(id);
        if (!restaurant) {
            throw new common_1.NotFoundException('Restaurant not found');
        }
        return restaurant;
    }
    async updateById(id, restaurant) {
        const findRes = await this.restaurantModel.find();
        const names = findRes.map(x => x.name);
        const email = findRes.map(x => x.email);
        const chefs = findRes.map(x => x.officialChef);
        if (names.includes(restaurant.name)) {
            throw new common_1.ConflictException("Restaurant with this name already exist");
        }
        if (chefs.includes(restaurant.officialChef)) {
            throw new common_1.ConflictException(" Chef already employed by another Restaurant");
        }
        if (email.includes(restaurant.email)) {
            throw new common_1.ConflictException("A Restaurant already as this email listed as its official email");
        }
        return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
            new: true,
            runValidators: true,
        });
    }
    async deleteById(id) {
        return await this.restaurantModel.findByIdAndDelete(id);
    }
    async uploadImages(id, files) {
        const images = await mapFeat_1.default.upload(files);
        const restaurant = await this.restaurantModel.findByIdAndUpdate(id, {
            images: images,
        }, {
            new: true,
            runValidators: true,
        });
        return restaurant;
    }
    async deleteImages(images) {
        if (images.length === 0)
            return true;
        const res = await mapFeat_1.default.deleteImages(images);
        return res;
    }
};
RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(restaurants_schema_1.Restaurant.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], RestaurantsService);
exports.RestaurantsService = RestaurantsService;
//# sourceMappingURL=restaurants.service.js.map