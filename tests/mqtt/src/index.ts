import { connect } from 'mqtt';

console.log('MQTT script is running');

const RU_BASE_URL = 'test.atlas-gsm.ru';
const EU_BASE_URL = 'test79.atlas-gsm.ru';
const BASE_URL = RU_BASE_URL;
const TOPICS = {
  EVENTS: '+/e',
  STATUSES: '+/s',
  NAVIGATION: '+/n',
};

const client = connect(`mqtt://${BASE_URL}:1883`, {
  // clientId: 'atlas-worker-channel-s',
  username: 'worker1',
  password: '5555',
});

client.on('connect', () => {
  console.log('Успешно подключились к серверу');

  // client.subscribe('#', (err, granted) => {
  //   if (err) {
  //     console.log(`Произошло ошибка в топике #: ${err}`);
  //   }
  //   console.log(`Подключились к каналу #: ${JSON.stringify(granted)}`);
  // });

  client.subscribe(TOPICS.STATUSES, (err, granted) => {
    if (err) {
      console.log(`Произошло ошибка в топике ${TOPICS.STATUSES}: ${err}`);
    }
    console.log(`Подключились к каналу: ${JSON.stringify(granted)}`);
  });

  client.subscribe(TOPICS.EVENTS, (err, granted) => {
    if (err) {
      console.log(`Произошло ошибка в топике ${TOPICS.EVENTS}: ${err}`);
    }
    console.log(`Подключились к каналу: ${JSON.stringify(granted)}`);
  });

  client.subscribe(TOPICS.NAVIGATION, (err, granted) => {
    if (err) {
      console.log(`Произошло ошибка в топике ${TOPICS.NAVIGATION}: ${err}`);
    }
    console.log(`Подключились к каналу: ${JSON.stringify(granted)}`);
  });
});

client.on('reconnect', () => {
  console.log('Переподключение к серверу');
});

client.on('error', (err) => {
  console.log('Произошла ошибка:', err.message);
});

client.on('message', (topic, message) => {
  console.log(`Получено сообщение из топика: ${topic}. Message: 0x0x${message.toString('hex')}`);
});
