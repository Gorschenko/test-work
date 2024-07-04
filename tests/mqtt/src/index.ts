import { MqttService } from './MqttService';
import { mqttOptions } from './helpers';
import { Url } from './types';

const subscriber = new MqttService(Url.DEV_RU_BASE, mqttOptions);
subscriber.init;
