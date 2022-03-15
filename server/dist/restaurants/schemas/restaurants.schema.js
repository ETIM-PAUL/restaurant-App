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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantSchema = exports.Restaurant = exports.Category = exports.Location = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../../authentication/schema/user.schema");
class Location {
}
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['Point'] }),
    __metadata("design:type", String)
], Location.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: '2dsphere' }),
    __metadata("design:type", Array)
], Location.prototype, "coordinates", void 0);
exports.Location = Location;
var Category;
(function (Category) {
    Category["Fast_Food"] = "Fast Food";
    Category["Cafe"] = "Cafe";
    Category["Dinning"] = "Dinning";
    Category["Cuisine_Restaurant"] = "Cuisines Restaurants";
    Category["Seafood_Restaurant"] = "Seaside Restaurants";
})(Category = exports.Category || (exports.Category = {}));
let Restaurant = class Restaurant {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Restaurant.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Restaurant.prototype, "officialChef", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Restaurant.prototype, "reservations", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Restaurant.prototype, "orderOut", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Restaurant.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Restaurant.prototype, "contactNo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Restaurant.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Restaurant.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Restaurant.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: Object, ref: 'Location' }]),
    __metadata("design:type", Location)
], Restaurant.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }]),
    __metadata("design:type", Array)
], Restaurant.prototype, "menu", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]),
    __metadata("design:type", Array)
], Restaurant.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Restaurant.prototype, "user", void 0);
Restaurant = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], Restaurant);
exports.Restaurant = Restaurant;
exports.RestaurantSchema = mongoose_1.SchemaFactory.createForClass(Restaurant);
//# sourceMappingURL=restaurants.schema.js.map