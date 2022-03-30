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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const current_user_decorator_1 = require("../authentication/decorators/current-user-decorator");
const orderStatus_decorator_1 = require("../authentication/decorators/orderStatus.decorator");
const roles_decorator_1 = require("../authentication/decorators/roles.decorator");
const roles_guard_1 = require("../authentication/guards/roles.guard");
const user_schema_1 = require("../authentication/schema/user.schema");
const creatOrder_dto_1 = require("./dto/creatOrder.dto");
const updateOrder_dto_1 = require("./dto/updateOrder.dto");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getAllOrders() {
        return this.orderService.findAll();
    }
    async getOrderById(id) {
        return this.orderService.findOrderById(id);
    }
    async getOrdersByMeal(id) {
        return this.orderService.findOrderForMeal(id);
    }
    async getOrdersByRestaurant(id) {
        return this.orderService.findOrderForRestaurant(id);
    }
    async getOrdersByUser(id) {
        return this.orderService.findOrdersForUser(id);
    }
    async createOrder(createOrderDto, user) {
        return this.orderService.create(createOrderDto, user);
    }
    async deleteOrder(id, user) {
        const order = await this.orderService.findOrderById(id);
        this.orderService.deleteById(id);
        return {
            deleted: true,
        };
    }
    async updateMeal(updateOrderDto, id, user) {
        const meal = await this.orderService.findOrderById(id);
        return this.orderService.updateById(id, updateOrderDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderById", null);
__decorate([
    (0, common_1.Get)('meal/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrdersByMeal", null);
__decorate([
    (0, common_1.Get)('restaurant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrdersByRestaurant", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrdersByUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("user"),
    (0, orderStatus_decorator_1.OrderStatus)(true),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [creatOrder_dto_1.CreateOrderDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("admin", "owner"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("admin", "owner"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateOrder_dto_1.UpdateOrderDto, String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateMeal", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map