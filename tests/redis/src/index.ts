import { createClient } from 'redis';
import { RedisClient } from './types';
import { REDIS_URL, RedisChannel } from './static';

const connectToRedis = async (): Promise<RedisClient> => {
  const client = createClient({ url: REDIS_URL });
  client.on('connect', () => {
    console.log('Успешно подключились к Redis');
  });
  client.on('error', (err) => {
    console.log('Ошибка Redis: ' + err);
  });
  client.on('end', () => {
    console.log('Отключились от Redis');
  });
  client.on('message', (channel, message) => {
    console.log('Получено сообщение из канала ' + channel + ': ' + message);
  });
  await client.connect();
  return client;
};

const sendMessage = (client: RedisClient) => {
  client.publish(RedisChannel.FIRST, JSON.stringify({ test: '123' }));
};

const bootstrap = async () => {
  const subscriberOne = await connectToRedis();
  subscriberOne.subscribe(RedisChannel.FIRST, (message: string) => {
    console.log('Получено сообщение из канала ' + RedisChannel.FIRST + ': ' + message);
  });
  const subscriberTwo = await connectToRedis();
  subscriberTwo.subscribe(RedisChannel.FIRST, (message: string) => {
    console.log('Получено сообщение из канала ' + RedisChannel.FIRST + ': ' + message);
  });
  const publisher = await connectToRedis();
  setInterval(() => sendMessage(publisher), 2000);
};

bootstrap();
