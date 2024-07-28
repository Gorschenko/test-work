import axios, { AxiosRequestConfig } from 'axios';
import { PATHS, SERVER_BASE_URL } from './data';
import { getRandomInt } from '../../mqtt/src/services/helpers';

const getRandomKeyByObj = (obj: object) => {
  const maxRandomInt = Object.keys(obj).length - 1;
  const randomInt = getRandomInt(0, maxRandomInt);
  const randomKey = Object.values(obj)[randomInt];
  return randomKey;
};

const doRequest = async () => {
  try {
    const config: AxiosRequestConfig = {
      method: 'GET',
      baseURL: SERVER_BASE_URL,
      url: getRandomKeyByObj(PATHS),
    };
    console.log(`Request is started. Config: ${JSON.stringify(config)}`);
    const { data } = await axios.request(config);
    console.log(`Request is finished. Response: ${data}`);
  } catch (e) {
    console.log(`Request is failed. Reason: ${e}`);
  }
};

const bootstrap = () => {
  setInterval(doRequest, 10000);
};

bootstrap();
