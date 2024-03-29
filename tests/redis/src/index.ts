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

const publishMessage = (client: RedisClient) => {
  client.publish(RedisChannel.FIRST + '123', JSON.stringify({ test: '123' }));
};

const sendError = (client: RedisClient) => {
  client.emit('error', new Error('Это созданная ошибка'));
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
  setInterval(() => {
    publishMessage(publisher);
    sendError(publisher);
  }, 2000);
};

bootstrap();

// КЛЮЧ-ЗНАЧЕНИЕ

// Установка значения в кэше
// client.set('ключ', 'значение', redis.print);

// Получение значения из кэша
// client.get('ключ', function(err, reply) {
//   console.log(reply); // Выводит значение из кэша
// });

// Установка значения в кэше с таймаутом
// client.set('ключ', 'значение', 'EX', 10); // Устанавливает значение с таймаутом в 10 секунд

// Удаление значения из кэша
// client.del('ключ');

// ХЭШ

// Установка значения хеша
// client.hset('myhash', 'field1', 'value1', redis.print);

// Получение значения из хеша
// client.hget('myhash', 'field1', function(err, reply) {
//   console.log(reply); // Выводит значение из хеша
// });

// Получение всех полей и значений хеша
// client.hgetall('myhash', function(err, obj) {
//   console.dir(obj); // Выводит все поля и значения хеша
// });

// СПИСКИ

// Добавление элементов в список
// client.rpush('mylist', 'element1', 'element2', redis.print);

// Получение элементов списка
// client.lrange('mylist', 0, -1, function(err, reply) {
//   console.log(reply); // Выводит все элементы списка
// });

// МНОЖЕСТВА

// Добавление элементов во множество
// client.sadd('myset', 'member1', 'member2', redis.print);

// Получение элементов множества
// client.smembers('myset', function(err, reply) {
//   console.log(reply); // Выводит все элементы множества
// });
