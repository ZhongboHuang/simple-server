import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class CacheService {
  constructor(@Inject('REDIS_CLIENT') private redisClient: RedisClientType) {}
  // 获取值
  async get(key: string) {
    const value = await this.redisClient.get(key);
    value ? JSON.parse(value) : null;
    return value;
  }
  // 设置值
  async set(key: string, value: any, seconds?: number) {
    value = JSON.stringify(value);
    if (seconds) {
      await this.redisClient.set(key, value, { EX: seconds });
    } else {
      await this.redisClient.set(key, value);
    }
  }
  // 删除值
  async del(key: string) {
    await this.redisClient.del(key);
  }
  // 清除缓存
  async flushAll() {
    await this.redisClient.flushAll();
  }
}
