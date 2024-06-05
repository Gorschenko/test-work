import { connect } from 'mqtt';

const client = connect('mqtt://78.155.221.10:1883');

client.on('connect', () => {
  console.log('Успешно подключились к серверу');
  client.subscribe('#');
});

client.on('message', (topic, message) => {
  console.log(`Получено сообщение из топика: ${topic}`);
});
