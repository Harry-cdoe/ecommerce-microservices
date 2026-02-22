import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @EventPattern('order.created')
  handleOrderCreated(data: any) {
    console.log('Order event received in product-service:', data);

    console.log(
      `Reducing stock for product ${data.productId} by ${data.quantity}`,
    );
  }
}