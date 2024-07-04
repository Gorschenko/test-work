import { IClientOptions, MqttClient, connect } from 'mqtt';
import { Topic } from './types';

export class MqttService {
  protected client: MqttClient;

  constructor(url: string, options: IClientOptions) {
    this.init(url, options);
  }

  init(url: string, options: IClientOptions) {
    this.client = connect(`mqtt://${url}:1883`, options);
    this.setBaseListeners();
  }

  private setBaseListeners() {
    this.client.on('connect', () => {
      console.log('Успешно подключились к серверу');
    });
    this.client.on('error', (err) => {
      console.log('Произошла ошибка:', err.message);
    });
    this.client.on('reconnect', () => {
      console.log('Переподключение к серверу');
    });
    this.client.on('message', (topic, message) => {
      console.log(`Получено сообщение из топика ${topic}: ${JSON.stringify(message)}`);
    });
  }

  public async subscribe(t: Topic) {
    const granted = await this.client.subscribeAsync('+/' + t);
    console.log(`Подключились к топику: ${JSON.stringify(granted)}`);
  }

  public async subscribeToAllTopics() {
    await Promise.all(Object.values(Topic).map(this.subscribe.bind(this)));
  }

  public async publish(topic: string, message: object | string) {
    if (typeof message === 'object') {
      message = JSON.stringify(message);
    }
    return this.client.publishAsync(topic, message);
  }
}
