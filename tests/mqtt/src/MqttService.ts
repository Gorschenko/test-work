import { IClientOptions, MqttClient, connectAsync } from 'mqtt';
import { Topic } from './types';

export class MqttService {
  private client: MqttClient;

  constructor(url: string, options: IClientOptions) {
    this.init(url, options);
  }

  async init(url: string, options: IClientOptions) {
    this.client = await connectAsync(`mqtt://${url}:1883`, options);
    this.setListeners();
  }

  setListeners() {
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

  subscribe(t: Topic) {
    const topic = '+/' + t;
    this.client.subscribe(topic, (err, granted) => {
      if (err) {
        console.log(`Произошла ошибка в топике ${t}: ${err}`);
      }
      console.log(`Подключились к топику: ${JSON.stringify(granted)}`);
    });
  }
}
