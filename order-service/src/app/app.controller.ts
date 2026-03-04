import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import {
  ORDER_CREATED_EVENT,
  OrderCreatedEvent,
} from '@contracts/events/order-created.event';

@Controller()
export class AppController {
  constructor(
    @Inject('PRODUCT_SERVICE') private productClient: ClientProxy,
  ) { }

  @MessagePattern('CREATE_ORDER')
  async createOrder(data: any) {
    const order = {
      orderId: Math.floor(Math.random() * 10000),
      ...data,
    };

    console.log('Order created:', order);

    // 🔥 Emit event (fire-and-forget)
    this.productClient.emit<OrderCreatedEvent>(
      ORDER_CREATED_EVENT,
      order
    );

    return {
      status: 'success',
      orderId: order.orderId,
    };
  }
}