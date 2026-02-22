import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private productClient: ClientProxy,
    @Inject('ORDER_SERVICE') private orderClient: ClientProxy,
  ) { }

  @Get('ping')
  async ping() {
    const response = await firstValueFrom(
      this.authClient.send('ping', 'Hello Auth Service'),
    );

    return response;
  }

  @Get('products')
  async getProducts() {
    const response = await firstValueFrom(
      this.productClient.send('get_products', {}),
    );

    return response;
  }

  @Post('orders')
  async createOrder(@Body() body: any) {
    return await firstValueFrom(
      this.orderClient.send('create_order', body),
    );
  }
}