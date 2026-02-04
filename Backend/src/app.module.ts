import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidation } from './config/env.validation';
import { databaseConfig } from './config/database.config';
import { redisConfig } from './config/redis.config';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { SellersModule } from './modules/sellers/sellers.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ChatModule } from './modules/chat/chat.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envValidation,
      load: [databaseConfig, redisConfig],
    }),
    PrismaModule,
    CommonModule,
    AuthModule,
    UsersModule,
    PetsModule,
    SellersModule,
    FavoritesModule,
    ReservationsModule,
    PaymentsModule,
    OrdersModule,
    ChatModule,
    NotificationsModule,
  ],
})
export class AppModule {}
