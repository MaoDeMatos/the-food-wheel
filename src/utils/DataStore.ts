'use client';

import { proxy, useSnapshot } from 'valtio';

type Option = string;

type WheelImage = string;

export type IDataStore = {
  wheelStatus: 'spinning' | 'stopped' | 'ready';
  initialSpeed: number;
  slowdownTime: number;
  options: Option[];
  image: WheelImage | null;
};

export const dataStore = proxy<IDataStore>({
  wheelStatus: 'ready',
  initialSpeed: 2,
  slowdownTime: 6,
  options: [
    'KFK 2',
    "McDo'",
    // 'Option C',
    // 'Option D',
    // 'Option E',
    // 'Option F',
    // 'Option G',
    // 'Option H',
    // 'Option I',
    '',
  ],
  image: null,
});

export const useDataStoreAsync = () => useSnapshot(dataStore);
export const useDataStoreSync = () => useSnapshot(dataStore, { sync: true });

export function changeWheelStatus(status: IDataStore['wheelStatus']) {
  dataStore.wheelStatus = status;
}

export function setInitialSpeed(newSpeed: number) {
  dataStore.initialSpeed = newSpeed;
}

export function setSlowdownTime(newSpeed: number) {
  dataStore.slowdownTime = newSpeed;
}

export const optionsActions = {
  addOption(option: Option = '') {
    dataStore.options.push(option);
  },
  removeOptionById(index: number) {
    dataStore.options.splice(index, 1);
  },
  // removeOptionsByValue(option: Option) {
  //   dataStore.options = dataStore.options.filter((opt) => opt !== option);
  // },
  updateOptionValue(index: number, option: Option) {
    dataStore.options[index] = option;
  },
};

export function setImage(newValue: IDataStore['image']) {
  dataStore.image = newValue;
}
