import {
  DynamicModule,
  Module,
  ModuleMetadata,
  FactoryProvider,
} from '@nestjs/common';
import IORedis, { RedisOptions, Redis } from 'ioredis';

export const IORediskey = 'key';

type RedisModuleOptions = {
  connectionOptions: RedisOptions;
  onClientReady?: (client: Redis) => void;
};

type RedisAsyncModuleOptions = {
  useFactory: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;

@Module({})
export class RedisModule {
  static async registerAsync({
    useFactory,
    imports,
    inject,
  }: RedisAsyncModuleOptions): Promise<DynamicModule> {
    const redisProvider = {
      provide: IORediskey,
      useFactory: async (...args) => {
        const { connectionOptions, onClientReady } = await useFactory(...args);
        const client = await new IORedis(connectionOptions);
        onClientReady(client);
        return client;
      },
      inject
    };

    return {
      module: RedisModule,
      exports: [redisProvider],
      imports,
      providers: [redisProvider],
    };
  }
}
