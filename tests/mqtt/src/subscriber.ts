import { MqttService } from './services/MqttService';
import { Url } from './services/types';
import { mqttSubscriberOptions } from './services/helpers';

const bootstrap = async () => {
  const subscriber = new MqttService(Url.DEV_RU_BASE, mqttSubscriberOptions);
  await subscriber.subscribeToAllTopics();
};

bootstrap();

const coordsData = [151, 1, 254, 15, 192, 100, 182, 35, 128, 35, 39, 18, 158, 10, 0, 0, 1];
console.log('Coords data: ', coordsData);
console.log('Coords data length: ', coordsData.length);

const coordsBuf = Buffer.from(coordsData);
console.log('Coords data buffer: ', coordsBuf);

const ptime = coordsBuf.readUInt32LE(0);
const plat = coordsBuf.readInt32LE(4);
const plon = coordsBuf.readInt32LE(8);
const pcourse = coordsBuf.readUInt16LE(12);
const pspeed = coordsBuf.readUInt16LE(14);
const pmode = coordsBuf.readUInt8(16);

console.log('Parsed coords data: ', ptime, plat, plon, pcourse, pspeed, pmode);
