import { IClientOptions } from 'mqtt';

export const getRandomInt = (min: number, max: number) => {
  if (min > max) {
    throw Error(`Неправильные параметры: max ${max}; min ${min}`);
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const mqttSubscriberOptions: IClientOptions = {
  username: 'worker1',
  password: '5555',
};

export const mqttPublisherOptions: IClientOptions = {
  username: '9990002',
  password: '9990002pass',
};
