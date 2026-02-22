import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('ping')
  handlePing(data: string) {
    console.log('Received:', data);
    return 'pong from auth-service';
  }
}