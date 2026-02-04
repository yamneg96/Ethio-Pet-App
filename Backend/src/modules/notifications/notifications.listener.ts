import { Injectable } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { notificationEvents, NOTIFICATION_EVENTS } from './notifications.events';

@Injectable()
export class NotificationsListener {
  constructor(private readonly notificationsService: NotificationsService) {
    notificationEvents.on(NOTIFICATION_EVENTS.ORDER_STATUS_CHANGED, async (payload) => {
      await this.notificationsService.createNotification(payload.userId, 'Order Update', payload.message, payload.data);
    });

    notificationEvents.on(NOTIFICATION_EVENTS.MESSAGE_RECEIVED, async (payload) => {
      await this.notificationsService.createNotification(payload.userId, 'New Message', payload.message, payload.data);
    });

    notificationEvents.on(NOTIFICATION_EVENTS.RESERVATION_CONFIRMED, async (payload) => {
      await this.notificationsService.createNotification(payload.userId, 'Reservation Confirmed', payload.message, payload.data);
    });
  }
}
