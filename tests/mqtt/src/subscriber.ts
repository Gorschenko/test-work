import { MqttService } from './services/MqttService';
import { Url } from './services/types';
import { mqttSubscriberOptions } from './services/helpers';

const buffer: Buffer = Buffer.from([10, 0, 0, 0, 97]);

const command = buffer.readUInt8(0);

console.log(command);

const bootstrap = async () => {
  const subscriber = new MqttService(Url.LOCAL, mqttSubscriberOptions);
  await subscriber.subscribeToAllTopics();
};

bootstrap();
