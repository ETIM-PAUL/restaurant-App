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
exports.OrderStatusGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let OrderStatusGuard = class OrderStatusGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const orderOut = this.reflector.get('orderOut', context.getHandler());
        if (!orderOut)
            return true;
        const request = context.switchToHttp().getRequest();
        const restaurant = request.restaurant;
        return matchOrderStatus(restaurant, restaurant.orderOut);
    }
};
OrderStatusGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], OrderStatusGuard);
exports.OrderStatusGuard = OrderStatusGuard;
function matchOrderStatus(orderOut, restaurantOrder) {
    if (!orderOut.includes(restaurantOrder))
        return false;
    return true;
}
//# sourceMappingURL=order.guard.js.map