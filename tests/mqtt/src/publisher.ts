import { mqttPublisherOptions } from './helpers';
import { Url } from './types';
import { MqttDevicePublisher } from './services/MqttDevicePublisher';

const bootstrap = () => {
  const publisher = new MqttDevicePublisher(Url.DEV_RU_BASE, mqttPublisherOptions);
};

bootstrap();
