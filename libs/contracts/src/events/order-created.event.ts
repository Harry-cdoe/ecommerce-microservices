// Event name constant (single source of truth)
export const ORDER_CREATED_EVENT = 'order.created';

// Strongly typed payload
export interface OrderCreatedEvent {
  orderId: number;
  productId: number;
  quantity: number;
}