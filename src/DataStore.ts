'use client';

import { proxy, useSnapshot } from 'valtio';

type Option = string;

type IDataStore = {
  initialSpeed: number;
  slowdownSpeed: number;
  options: Option[];
};

export const dataStore = proxy<IDataStore>({
  initialSpeed: 2,
  slowdownSpeed: 8,
  options: [
    'Option A',
    'Option B',
    'Option C',
    'Option D',
    'Option E',
    'Option F',
    'Option G',
    'Option H',
    'Option I',
    // '',
  ],
});

export const useDataStoreAsync = () => useSnapshot(dataStore);
export const useDataStoreSync = () => useSnapshot(dataStore, { sync: true });

export function setInitialSpeed(newSpeed: number) {
  dataStore.initialSpeed = newSpeed;
}

export function setSlowdownSpeed(newSpeed: number) {
  dataStore.slowdownSpeed = newSpeed;
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
