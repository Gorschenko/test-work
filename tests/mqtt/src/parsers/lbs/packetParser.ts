import {
  CODE_LENGTH,
  COMMON_DATA_LENGTH,
  LAC_LENGTH,
  MCC_LENGTH,
  MNC_LENGTH,
  SINGLE_TOWER_DATA_LENGTH,
  TIME_LENGTH,
  TOWERS_COUNT_LENGTH,
} from './static';

const parseCommonPacketData = (packet: Buffer) => {
  let offset = 0;
  const time = packet.readUInt32LE(offset);
  offset += TIME_LENGTH;
  const commandCode = packet.readUInt8(offset);
  offset += CODE_LENGTH;
  const towersCount = packet.readUInt8(offset);
  offset += TOWERS_COUNT_LENGTH;

  return {
    time,
    commandCode,
    towersCount,
  };
};

const parseBinaryTowerToObj = (tower: Buffer) => {
  let offset = 0;
  const mobileCountryCode = tower.readUInt16LE(offset);
  offset += MCC_LENGTH;
  const mobileNetworkCode = tower.readUInt16LE(offset);
  offset += MNC_LENGTH;
  const locationAreaCode = tower.readUInt16LE(offset);
  offset += LAC_LENGTH;
  const cellId = tower.readUInt32LE(offset);

  return {
    mobileCountryCode,
    mobileNetworkCode,
    locationAreaCode,
    cellId,
  };
};

const parseTowers = (packet: Buffer) => {
  // Отсекаем общие данные и работаем с массивом вышек
  const towers = packet.slice(COMMON_DATA_LENGTH, packet.length);
  const towersCount = towers.length / SINGLE_TOWER_DATA_LENGTH;
  // Выполняем преобразование [] => [[], [], []]
  const towersTuple = [];
  for (let i = 0; i < towersCount; i++) {
    const tower = towers.slice(i * SINGLE_TOWER_DATA_LENGTH, (i + 1) * SINGLE_TOWER_DATA_LENGTH);
    towersTuple.push(tower);
  }
  const result = towersTuple.map(parseBinaryTowerToObj);
  return result;
};

export const validateLbsPacket = (packet: Buffer) => {
  console.log('validate of packet started');
  const towersDataOffset = 0 + TIME_LENGTH + CODE_LENGTH + TOWERS_COUNT_LENGTH;
  const towers = packet.slice(towersDataOffset, packet.length);
  const isValid = towers.length % SINGLE_TOWER_DATA_LENGTH === 0;
  if (!isValid) {
    throw Error('Lbs packet is not valid');
  }
  console.log('validate of packet finished');
};

const parseLbsPacket = (packet: Buffer) => {
  console.log('parse of lbs packet started');
  const commonData = parseCommonPacketData(packet);
  const towers = parseTowers(packet);
  const result = {
    ...commonData,
    towers,
  };
  console.log('parse of lbs packet finished. Towers length: ', result.towers.length);
  return result;
};

export const parsePacket = (packet: Buffer) => {
  const commandOffset = 0 + TIME_LENGTH;
  const commandCode = packet.readUInt8(commandOffset);
  if (commandCode === 0x01) {
    validateLbsPacket(packet);
    return parseLbsPacket(packet);
  } else {
    throw Error('Command is not found');
  }
};
