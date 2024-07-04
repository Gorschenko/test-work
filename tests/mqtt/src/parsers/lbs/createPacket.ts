import {
  CODE_LENGTH,
  COMMON_DATA_LENGTH,
  LAC_LENGTH,
  MCC_LENGTH,
  MNC_LENGTH,
  SINGLE_TOWER_DATA_LENGTH,
  TIME_LENGTH,
} from './static';
import { ITower } from './types';

const transformTowerObjToBinary = (tower: ITower) => {
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

const createCommonPacketData = (towers: ITower[]) => {
  const result = Buffer.alloc(COMMON_DATA_LENGTH);

  let offset = 0;
  result.writeUInt32LE(0, offset);
  offset += TIME_LENGTH;
  result.writeInt8(1, offset);
  offset += CODE_LENGTH;
  result.writeInt8(towers.length, offset);

  return result;
};

export const createPacket = (towers: ITower[]) => {
  console.log('create packet is started', towers);
  const packetLength = COMMON_DATA_LENGTH + towers.length * SINGLE_TOWER_DATA_LENGTH;
  const packetCommonData = createCommonPacketData(towers);
  const towersToBinary = towers.map(transformTowerObjToBinary);

  const combinedBuffer = Buffer.concat([packetCommonData, ...towersToBinary]);
  const result = Buffer.alloc(packetLength, combinedBuffer);
  console.log('create packet is finished', result);
  return result;
};
