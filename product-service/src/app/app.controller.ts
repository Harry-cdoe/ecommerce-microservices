import { Controller, OnModuleInit } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices'; // 1. Added MessagePattern
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './product.entity';
import {
  ORDER_CREATED_EVENT,
  OrderCreatedEvent,
} from '@contracts';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) { }

  async onModuleInit() {
    const count = await this.productRepo.count();
    if (count === 0) {
      await this.productRepo.save([
        { name: 'Laptop', stock: 10 },
        { name: 'Phone', stock: 20 },
        { name: 'Headphones', stock: 15 },
      ]);
      console.log('Seeded initial products');
    }
  }

  // 2. Add this handler to answer the Gateway's 'send' call
  @MessagePattern('get_products')
  async handleGetProducts() {
    console.log('Fetching all products from DB...');
    return await this.productRepo.find();
  }

  @EventPattern(ORDER_CREATED_EVENT)
  async handleOrderCreated(data: OrderCreatedEvent) {
    const product = await this.productRepo.findOne({
      where: { id: data.productId },
    });

    if (!product) {
      console.log('Product not found');
      return;
    }

    if (product.stock < data.quantity) {
      console.log('Not enough stock');
      return;
    }

    product.stock -= data.quantity;
    await this.productRepo.save(product);

    console.log('Stock reduced successfully');
  }
}
