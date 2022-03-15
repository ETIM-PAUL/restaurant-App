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
exports.MealSchema = exports.Meal = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../../authentication/schema/user.schema");
var Category;
(function (Category) {
    Category["AFRICAN_SOUPS"] = "African Soups";
    Category["SALADS"] = "Salads";
    Category["SANDWICHES"] = "Sandwiches";
    Category["PASTA"] = "Pasta";
    Category["PASTRIES"] = "Pastries";
    Category["DRINKS"] = "Drinks";
})(Category = exports.Category || (exports.Category = {}));
let Meal = class Meal {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Meal.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Meal.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Meal.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Meal.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }),
    __metadata("design:type", String)
], Meal.prototype, "restaurant", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Meal.prototype, "user", void 0);
Meal = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], Meal);
exports.Meal = Meal;
exports.MealSchema = mongoose_1.SchemaFactory.createForClass(Meal);
//# sourceMappingURL=meal.schema.js.map