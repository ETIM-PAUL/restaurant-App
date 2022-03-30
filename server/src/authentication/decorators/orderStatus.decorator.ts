import { SetMetadata } from "@nestjs/common";

export const OrderStatus = (orderStatus: boolean) => SetMetadata('orderStatus', orderStatus)