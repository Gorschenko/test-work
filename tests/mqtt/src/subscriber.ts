import { MqttService } from './services/MqttService';
import { Url } from './types';
import { mqttSubscriberOptions } from './helpers';

const bootstrap = async () => {
  const subscriber = new MqttService(Url.DEV_RU_BASE, mqttSubscriberOptions);
  await subscriber.subscribeToAllTopics();
};

bootstrap();
