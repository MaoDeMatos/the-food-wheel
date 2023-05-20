'use client';

import { proxy, useSnapshot } from 'valtio';

export const themes = ['light', 'dark'] as const;
export type ThemesType = (typeof themes)[number] | 'system';

type IThemeStore = { currentTheme: ThemesType };

const themeStoreKey = 'theme-storage';

let storedThemeString;

if (typeof window !== 'undefined') {
  storedThemeString = localStorage.getItem(themeStoreKey);
}

const initialValue = {
  currentTheme: storedThemeString
    ? (JSON.parse(storedThemeString) as ThemesType)
    : 'system',
} as const;

const themeStore = proxy<IThemeStore>(initialValue);

export const useThemeStore = () => useSnapshot(themeStore);

export function changeTheme(newTheme: ThemesType) {
  document.documentElement.setAttribute(
    'data-theme',
    newTheme === 'system' ? getSystemTheme() : newTheme
  );
  themeStore.currentTheme = newTheme;
  localStorage.setItem(themeStoreKey, JSON.stringify(newTheme));
}

function getSystemTheme() {
  return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}
