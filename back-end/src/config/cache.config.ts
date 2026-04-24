// cache.config.ts
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';

export const cacheConfig = CacheModule.registerAsync({
  isGlobal: true,
  useFactory: async () => ({
    stores: [
      new KeyvRedis('redis://localhost:6379'),
    ],
    ttl: 60 * 1000, // milliseconds
  }),
});