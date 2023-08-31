// collection.service.ts

import { GeneratorService } from '@common/providers';
import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly generatorService: GeneratorService,
  ) {}

  async getSellOrders(userId: string) {
    return this.prismaService.order.findMany({
      where: {
        sellerId: userId,
      },
    });
  }
  async getBuyOrders(userId: string) {
    return this.prismaService.order.findMany({
      where: {
        buyerId: userId,
      },
    });
  }
  async getOrderById(orderId) {
    return this.prismaService.order.findUnique({
      where: {
        id: orderId,
      },
    });
  }
  async createInitialOrder(userId: string, orderData: CreateOrderDto) {
    return this.prismaService.order.create({
      data: {
        id: this.generatorService.uuid(),
        status: OrderStatus.PENDING,
        sellerId: userId,
        ...orderData,
      },
    });
  }
  async createFinalOrder(
    orderId: string,
    status: OrderStatus,
    transactionHash?: string,
  ) {
    return this.prismaService.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
        transactionHash,
      },
    });
  }
}
