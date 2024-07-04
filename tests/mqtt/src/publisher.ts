import { mqttPublisherOptions } from './services/helpers';
import { Url } from './services/types';
import { MqttDevicePublisher } from './services/MqttDevicePublisher';

const bootstrap = () => {
  const publisher = new MqttDevicePublisher(Url.DEV_RU_BASE, mqttPublisherOptions);
};

bootstrap();
