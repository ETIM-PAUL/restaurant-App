import { User } from 'src/authentication/schema/user.schema';
import { CreateOrderDto } from './dto/creatOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { OrderService } from './order.service';
import { Order } from './schema/order.schema';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    getAllOrders(): Promise<Order[]>;
    getOrderById(id: string): Promise<Order>;
    getOrdersByMeal(id: string): Promise<Order[]>;
    getOrdersByRestaurant(id: string): Promise<Order[]>;
    getOrdersByUser(id: string): Promise<Order[]>;
    createOrder(createOrderDto: CreateOrderDto, user: User): Promise<Order>;
    deleteOrder(id: string, user: User): Promise<{
        deleted: boolean;
    }>;
    updateMeal(updateOrderDto: UpdateOrderDto, id: string, user: User): Promise<Order>;
}
