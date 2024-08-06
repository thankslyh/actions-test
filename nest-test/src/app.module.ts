import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createClient } from 'redis';
import { TestEntity } from './test.entity';
import { EntityManager } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Li!21577',
      database: 'actions-test',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      connectorPackage: 'mysql2',
      entities: [TestEntity],
      poolSize: 10,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
    AppService,
  ],
})
export class AppModule {
  constructor(entity: EntityManager) {
    entity.save(TestEntity, {
      name: '小明' + Date.now(),
    });
  }
}
