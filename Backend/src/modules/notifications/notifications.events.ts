import { EventEmitter } from 'events';

export const NOTIFICATION_EVENTS = {
  ORDER_STATUS_CHANGED: 'order.status.changed',
  MESSAGE_RECEIVED: 'chat.message.received',
  RESERVATION_CONFIRMED: 'reservation.confirmed',
};

export const notificationEvents = new EventEmitter();
