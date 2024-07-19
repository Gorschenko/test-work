import { mqttPublisherOptions } from './services/helpers';
import { Topic, Url } from './services/types';
import { MqttDevicePublisher } from './services/MqttDevicePublisher';
import { createPacket } from './parsers/lbs/createPacket';
import { createTowersArray } from './parsers/lbs/helpers';

const bootstrap = () => {
  const publisher = new MqttDevicePublisher(Url.LOCAL, mqttPublisherOptions);
  setInterval(async () => {
    const towers = createTowersArray();

    // const towers = [
    //   {
    //     radioType: 'gsm',
    //     mobileCountryCode: 208,
    //     mobileNetworkCode: 1,
    //     locationAreaCode: 2,
    //     cellId: 1234567,
    //   },
    // ];

    const packet = createPacket(towers);
    await publisher.publish(Topic.REQUESTS, packet);
  }, 5000);
};

bootstrap();
