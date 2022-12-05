'use client';

import { proxy, useSnapshot } from 'valtio';

type Option = string;

type IDataStore = {
  wheelStatus: 'spinning' | 'stopped' | 'ready';
  initialSpeed: number;
  slowdownTime: number;
  options: Option[];
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
});

export const useDataStoreAsync = () => useSnapshot(dataStore);
export const useDataStoreSync = () => useSnapshot(dataStore, { sync: true });

export function changeWheelStatus(status: IDataStore['wheelStatus']) {
  dataStore.wheelStatus = status;
}

export function setInitialSpeed(newSpeed: number) {
  dataStore.initialSpeed = newSpeed;
}

export function setslowdownTime(newSpeed: number) {
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
