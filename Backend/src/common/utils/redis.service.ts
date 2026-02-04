import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT || 6379),
      password: process.env.REDIS_PASSWORD || undefined,
      lazyConnect: true,
      enableReadyCheck: true,
    });
  }

  async getClient(): Promise<Redis> {
    if (this.client.status === 'end' || this.client.status === 'close') {
      await this.client.connect();
    }
    if (this.client.status === 'wait') {
      await this.client.connect();
    }
    return this.client;
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
