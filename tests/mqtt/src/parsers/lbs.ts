const TIME_LENGTH = 4;
const CODE_LENGTH = 1;
const TOWERS_COUNT_LENGTH = 1;
const COMMON_DATA_LENGTH = TIME_LENGTH + CODE_LENGTH + TOWERS_COUNT_LENGTH;
const MCC_LENGTH = 2;
const MNC_LENGTH = 2;
const LAC_LENGTH = 2;
const TOWER_ID_LENGTH = 4;
const SINGLE_TOWER_DATA_LENGTH = MCC_LENGTH + MNC_LENGTH + LAC_LENGTH + TOWER_ID_LENGTH;

const firstTower = {
  radioType: 'gsm',
  mobileCountryCode: 208,
  mobileNetworkCode: 1,
  locationAreaCode: 2,
  cellId: 10,
};

const secondTower = {
  radioType: 'gsm',
  mobileCountryCode: 416,
  mobileNetworkCode: 2,
  locationAreaCode: 4,
  cellId: 20,
};

const towers = [firstTower, secondTower];

// ENTRY DATA IS FINISHED

const transformTowerObjToBinary = (tower) => {
  const result = Buffer.alloc(SINGLE_TOWER_DATA_LENGTH);
  let offset = 0;
  result.writeUInt16LE(tower.mobileCountryCode, offset);
  offset += MCC_LENGTH;
  result.writeUInt16LE(tower.mobileNetworkCode, offset);
  offset += MNC_LENGTH;
  result.writeUInt16LE(tower.locationAreaCode, offset);
  offset += LAC_LENGTH;
  result.writeUInt32LE(tower.cellId, offset);

  return result;
};

const parseBinaryTowerToObj = (tower) => {
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

// SIMPLE FUNCTIONS IS FINISHED

const createCommonPacketData = (towers) => {
  const result = Buffer.alloc(COMMON_DATA_LENGTH);

  let offset = 0;
  result.writeUInt32LE(0, offset);
  offset += TIME_LENGTH;
  result.writeInt8(1, offset);
  offset += CODE_LENGTH;
  result.writeInt8(towers.length, offset);

  return result;
};

const createPacket = (towers) => {
  console.log('create packet is started', towers);
  const packetLength = COMMON_DATA_LENGTH + towers.length * SINGLE_TOWER_DATA_LENGTH;
  const packetCommonData = createCommonPacketData(towers);
  const towersToBinary = towers.map(transformTowerObjToBinary);

  const combinedBuffer = Buffer.concat([packetCommonData, ...towersToBinary]);
  const result = Buffer.alloc(packetLength, combinedBuffer);
  console.log('create packet is finished', result);
  return result;
};

// CREATE PACKET FUNCTIONS IS FINISHED

const validateLbsPacket = (packet) => {
  console.log('validate of packet started: ', packet);
  const towersDataOffset = 0 + TIME_LENGTH + CODE_LENGTH + TOWERS_COUNT_LENGTH;
  const towers = packet.slice(towersDataOffset, packet.length);
  const isValid = towers.length % SINGLE_TOWER_DATA_LENGTH === 0;
  if (!isValid) {
    throw Error('Lbs packet is not valid');
  }
  console.log('validate of packet finished: ', true);
};

const parseCommonPacketData = (packet) => {
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

const parseTowers = (packet) => {
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

const parseLbsPacket = (packet) => {
  console.log('parse of lbs packet started: ', packet);
  const commonData = parseCommonPacketData(packet);
  const towers = parseTowers(packet);
  const result = {
    ...commonData,
    towers,
  };
  console.log('parse of lbs packet finished: ', result);
  return result;
};

const parsePacket = (packet) => {
  const commandOffset = 0 + TIME_LENGTH;
  const commandCode = packet.readUInt8(commandOffset);
  if (commandCode === 0x01) {
    validateLbsPacket(packet);
    return parseLbsPacket(packet);
  } else {
    throw Error('Command is not found');
  }
};

// PARSE PACKET FUNCTIONS IS FINISHED

const bootstrap = (towers) => {
  const packet = createPacket(towers);
  const parsedPacket = parsePacket(packet);
};

bootstrap(towers);
