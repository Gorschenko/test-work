import { RedisClientOptions, createClient } from 'redis';
// TO DO
// Переписать на LoggerService
// TO DO
// Оптимизировать библиотеки и перейти на самую новую версию Redis
// TO DO
// Подумать о создании Репозитория для взаимодействия с какой-либо сущностью, например, Devices
export class RedisService {
  private client: any;

  public connect(options: RedisClientOptions) {
    this.client = createClient(options);
    console.log('[RedisService] Успешно подключились к БД');
  }

  public async hget(hash: string, field: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.hget(hash, field, (err, res: string) => (err ? reject(err) : resolve(res)));
    });
  }

  public async hgetall<T>(hash: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client.hgetall(hash, (err, res: T) => (err ? reject(err) : resolve(res)));
    });
  }

  public async hset(hash: string, field: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.hset(hash, field, value, (err) => (err ? reject(err) : resolve()));
    });
  }

  public async hsetall(hash: string, update: { [key: string]: string }): Promise<void> {
    const entries = Object.entries(update);
    await Promise.all(entries.map(async (e) => await this.hset(hash, ...e)));
  }

  public async hdel(hash: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.hdel(hash, (err) => (err ? reject(err) : resolve()));
    });
  }

  public async set(key: string, value: string, expire?: number): Promise<void> {
    const args: (string | number)[] = [key, value];
    if (expire) {
      args.push('EX', expire);
    }
    return new Promise((resolve, reject) => {
      this.client.set(...args, (err) => (err ? reject(err) : resolve()));
    });
  }

  public async get(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, res) => (err ? reject(err) : resolve(res)));
    });
  }

  public async del(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => (err ? reject(err) : resolve()));
    });
  }
}
