import { createClient } from 'redis';
import { RedisClient } from './types';
import { REDIS_URL } from './static';

const initRedis = async (): Promise<RedisClient> => {
  const client = createClient({ url: REDIS_URL });
  client.on('connect', () => {
    console.log('Успешно подключились к Redis');
  });
  client.on('error', (err) => {
    console.log('Ошибка Redis: ' + err);
  });
  await client.connect();
  return client;
};

const bootstrap = async () => {
  const redieClient = await initRedis();
};

bootstrap();
