import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { RedisClientType } from 'redis';
import { TestEntity } from './test.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AppService {
  @Inject('REDIS_CLIENT')
  private readonly redisClient: RedisClientType;

  @InjectEntityManager()
  private readonly testEntity: EntityManager;

  async getRedisKey() {
    await this.redisClient.set('key', 'redis测试');
    return await this.redisClient.get('key');
  }

  async getMysqlData() {
    const test = await this.testEntity.getRepository(TestEntity);
    return test.find();
  }
}
