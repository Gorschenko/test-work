import { getRandomInt } from '../../services/helpers';
import { ITower } from './types';

const createRandomTower = (): ITower => ({
  radioType: 'gsm',
  mobileCountryCode: getRandomInt(1, 200),
  mobileNetworkCode: getRandomInt(1, 10),
  locationAreaCode: getRandomInt(1, 10),
  cellId: getRandomInt(1, 10000),
});

export const createTowersArray = (count?: number): ITower[] => {
  count = count || getRandomInt(1, 7);
  const towers: ITower[] = [];
  for (let i = 0; i < count; i++) {
    const tower = createRandomTower();
    towers.push(tower);
  }
  return towers;
};
