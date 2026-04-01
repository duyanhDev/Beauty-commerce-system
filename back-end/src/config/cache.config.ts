import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

export const cacheConfig = CacheModule.registerAsync({
  useFactory: async () => ({
    store: redisStore as any,
    host: 'localhost',
    port: 6379,
    ttl: 60,
    isGlobal: true,
  }),
});
