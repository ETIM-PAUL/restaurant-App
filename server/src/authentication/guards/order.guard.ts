import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class OrderStatusGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
      const orderOut = this.reflector.get<boolean>('orderOut', context.getHandler());

      if(!orderOut) return true;

      const request = context.switchToHttp().getRequest();
      const restaurant = request.restaurant;

      return matchOrderStatus(restaurant, restaurant.orderOut);
  }
}

function matchOrderStatus(orderOut, restaurantOrder) {
  if (!orderOut.includes(restaurantOrder)) return false;
  return true;
}
