import { CurrentUser } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Controller({
  version: '1',
})
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @UseGuards(AccessTokenGuard)
  @Get('sell')
  async getSellOrders(@CurrentUser() actor: User) {
    return this.orderService.getSellOrders(actor.id);
  }
  @Get('buy')
  async getBuyOrders(@CurrentUser() actor: User) {
    return this.orderService.getSellOrders(actor.id);
  }
  @UseGuards(AccessTokenGuard)
  @Post()
  async postOrder(
    @CurrentUser() actor: User,
    @Body() orderData: CreateOrderDto,
  ) {
    return this.orderService.createInitialOrder(actor.id, orderData);
  }
}
