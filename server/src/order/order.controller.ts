import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/authentication/decorators/current-user-decorator';
import { OrderStatus } from 'src/authentication/decorators/orderStatus.decorator';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { OrderStatusGuard } from 'src/authentication/guards/order.guard';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { User } from 'src/authentication/schema/user.schema';
import { CreateOrderDto } from './dto/creatOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
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

  @Get('meal/:id')
  async getOrdersByMeal(@Param('id') id: string): Promise<Order[]> {
    return this.orderService.findOrderForMeal(id)
  }

  @Get('restaurant/:id')
  async getOrdersByRestaurant(@Param('id') id: string): Promise<Order[]> {
    return this.orderService.findOrderForRestaurant(id)
  }

  @Get('user/:id')
  async getOrdersByUser(@Param('id') id: string): Promise<Order[]> {
    return this.orderService.findOrdersForUser(id)
  }

  // Create New Order
  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles("user")
  @OrderStatus(true)
  async createOrder( @Body() createOrderDto: CreateOrderDto,
  @CurrentUser() user: User
  ): Promise<Order> {
    return this.orderService.create(createOrderDto, user)
  }
  
  //Delete Order
  @Delete(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles("admin","owner")
  async deleteOrder(@Param('id') id: string, @CurrentUser() user:User): Promise<{ deleted: boolean }> {
    const order = await this.orderService.findOrderById(id);
    
  
  this.orderService.deleteById(id)
  return {
    deleted: true,
  };
}

//Update Order
@Put(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles("admin","owner")
  async updateMeal(@Body() updateOrderDto: UpdateOrderDto, @Param('id') id: string, @CurrentUser() user:User): Promise<Order> {
    const meal = await this.orderService.findOrderById(id);

  //   if(meal.user.toString() !== user._id.toString()) {
  //     throw new ForbiddenException("You dont own the Restaurant that has this meal");
  // }

  return this.orderService.updateById(id, updateOrderDto)
  }

}
