export const THEMES = ['light', 'dark'] as const;
export type ThemesType = (typeof THEMES)[number] | 'system';

export const THEME_STORAGE_KEY = 'theme-storage';
export const MEDIA = '(prefers-color-scheme: dark)';

export function getSystemTheme() {
  return window.matchMedia && window.matchMedia(MEDIA).matches
    ? 'dark'
    : 'light';
}
