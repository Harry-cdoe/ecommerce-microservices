import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('PRODUCT_SERVICE') private productClient: ClientProxy,
  ) { }
  
  @MessagePattern('create_order')
  async createOrder(data: any) {
    const order = {
      orderId: Math.floor(Math.random() * 10000),
      ...data,
    };

    console.log('Order created:', order);

    // 🔥 Emit event (fire-and-forget)
    this.productClient.emit('order.created', order);

    return {
      status: 'success',
      orderId: order.orderId,
    };
  }
}