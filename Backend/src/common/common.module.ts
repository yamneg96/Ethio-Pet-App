import { Global, Module } from '@nestjs/common';
import { RedisService } from './utils/redis.service';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class CommonModule {}
