import { IClientOptions } from 'mqtt';
import { MqttService } from './MqttService';

export class MqttDevicePublisher extends MqttService {
  private topicPrefix: string;

  constructor(url: string, options: IClientOptions) {
    super(url, options);
    this.setTopicPrefix(options.username);
  }

  private setTopicPrefix(prefix: string) {
    this.topicPrefix = prefix;
  }

  public async publish(topic: string, message: object | string) {
    topic = this.topicPrefix + '/' + topic;
    return super.publish(topic, message);
  }
}
