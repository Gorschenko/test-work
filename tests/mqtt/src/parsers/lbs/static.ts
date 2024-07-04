import { ITower } from './types';

export const TIME_LENGTH = 4;
export const CODE_LENGTH = 1;
export const TOWERS_COUNT_LENGTH = 1;
export const COMMON_DATA_LENGTH = TIME_LENGTH + CODE_LENGTH + TOWERS_COUNT_LENGTH;
export const MCC_LENGTH = 2;
export const MNC_LENGTH = 2;
export const LAC_LENGTH = 2;
export const TOWER_ID_LENGTH = 4;
export const SINGLE_TOWER_DATA_LENGTH = MCC_LENGTH + MNC_LENGTH + LAC_LENGTH + TOWER_ID_LENGTH;

export const firstTower: ITower = {
  radioType: 'gsm',
  mobileCountryCode: 208,
  mobileNetworkCode: 1,
  locationAreaCode: 2,
  cellId: 10,
};

export const secondTower: ITower = {
  radioType: 'gsm',
  mobileCountryCode: 416,
  mobileNetworkCode: 2,
  locationAreaCode: 4,
  cellId: 20,
};
