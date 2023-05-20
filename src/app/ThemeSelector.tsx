'use client';

import { ButtonHTMLAttributes, useEffect, useState } from 'react';

import {
  THEMES,
  ThemesType,
  getSystemTheme,
  THEME_STORAGE_KEY,
  MEDIA,
} from '@/utils/ColorTheme';
import { classNames } from '@/utils';

interface ThemeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  themeClasses: string;
  active: boolean;
}

const ThemeButton = ({ active, themeClasses, ...props }: ThemeButtonProps) => (
  <button
    className={classNames(
      `h-8 w-8 rounded-full border border-base-content ring-0 ring-transparent ring-offset-2 ring-offset-base-100 transition-all [&.active]:ring-2 [&.active]:ring-secondary`,
      active ? 'active' : '',
      themeClasses
    )}
    {...props}
  />
);

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState<ThemesType | null>(null);

  function changeTheme(newTheme: ThemesType) {
    document.documentElement.setAttribute(
      'data-theme',
      newTheme === 'system' ? getSystemTheme() : newTheme
    );
    setCurrentTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme));
  }

  // Init button state
  useEffect(() => {
    const storedThemeString = localStorage.getItem(THEME_STORAGE_KEY);
    const initialValue = storedThemeString
      ? (JSON.parse(storedThemeString) as ThemesType)
      : 'system';

    changeTheme(initialValue);
  }, []);

  // Change theme when system theme updates
  useEffect(
    () => {
      const setSystemTheme = () => {
        if (currentTheme === 'system') {
          changeTheme('system');
        }
      };

      const mq = window.matchMedia(MEDIA);
      mq.addEventListener('change', setSystemTheme);
      return () => mq.removeEventListener('change', setSystemTheme);
    },
    // You need this dependencies or the listener will never update current theme value
    [currentTheme, changeTheme]
  );

  return (
    <div className="flex gap-2" suppressHydrationWarning>
      <button type="button">{currentTheme === 'dark'}</button>
      <ThemeButton
        type="button"
        title="Activate system (automatic) color theme"
        active={currentTheme === 'system'}
        themeClasses="bg-base-100"
        onClick={() => changeTheme('system')}
      >
        <div className="h-0.5 w-full -rotate-45 bg-base-content" />
      </ThemeButton>

      {THEMES.map((theme) => (
        <ThemeButton
          key={theme}
          type="button"
          title={`Activate ${theme} theme`}
          active={theme === currentTheme}
          themeClasses={theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}
          onClick={() => changeTheme(theme)}
        />
      ))}
    </div>
  );
}
