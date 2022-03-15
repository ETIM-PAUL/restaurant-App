import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/authentication/decorators/current-user-decorator';
import { User } from 'src/authentication/schema/user.schema';
import { CreateOrderDto } from './dto/creatOrder.dto';
import { OrderService } from './order.service';
import { Order } from './schema/order.schema';

@Controller('order')
export class OrderController {
  constructor(private  orderService: OrderService) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
   return this.orderService.findAll()
  }
  
  @Get(':id')
  async getOrderById(@Param('id') id:string): Promise<Order> {
    return this.orderService.findOrderById(id)
  }

  @Get('restaurant/:id')
  async getMealsByRestaurant(@Param('id') id: string): Promise<Order[]> {
    return this.orderService.findOrderForRestaurant(id)
  }

  @Get('meal/:id')
  async getMealsByMeal(@Param('id') id: string): Promise<Order[]> {
    return this.orderService.findOrderForMeal(id)
  }

  // Create New Order
  @Post()
  @UseGuards(AuthGuard())
  async createOrder( @Body() createOrderDto: CreateOrderDto,
  @CurrentUser() user: User
  ): Promise<Order> {
    return this.orderService.create(createOrderDto, user)
  }
}
