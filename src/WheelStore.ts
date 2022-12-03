import { proxy } from 'valtio';

export const wheelStore = proxy({ initialSpeed: 2, slowdownSpeed: 8 });
