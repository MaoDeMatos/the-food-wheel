import { proxy } from 'valtio';

type IDataStore = {
  initialSpeed: number;
  slowdownSpeed: number;
  options: string[];
};

export const dataStore = proxy<IDataStore>({
  initialSpeed: 2,
  slowdownSpeed: 8,
  options: ['McDonalds'],
});

export function setInitialSpeed(newSpeed: number) {
  dataStore.initialSpeed = newSpeed;
}

export function setSlowdownSpeed(newSpeed: number) {
  dataStore.slowdownSpeed = newSpeed;
}

export function setOptions(option: IDataStore['options']) {
  dataStore.options = option;
}
