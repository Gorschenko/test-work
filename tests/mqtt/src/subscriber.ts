import { MqttService } from './services/MqttService';
import { Url } from './services/types';
import { mqttSubscriberOptions } from './services/helpers';

const bootstrap = async () => {
  const subscriber = new MqttService(Url.LOCAL, mqttSubscriberOptions);
  await subscriber.subscribeToAllTopics();
};

bootstrap();
