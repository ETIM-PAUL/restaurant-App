import { User } from 'src/authentication/schema/user.schema';
import { CreateOrderDto } from './dto/creatOrder.dto';
import { OrderService } from './order.service';
import { Order } from './schema/order.schema';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    getAllOrders(): Promise<Order[]>;
    getOrderById(id: string): Promise<Order>;
    getMealsByRestaurant(id: string): Promise<Order[]>;
    getMealsByMeal(id: string): Promise<Order[]>;
    createOrder(createOrderDto: CreateOrderDto, user: User): Promise<Order>;
}
