'use client';

import { ButtonHTMLAttributes, useEffect } from 'react';

import { themes, changeTheme, useThemeStore } from './utils/ColorTheme';
import { classNames } from './utils/utils';

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
  const { currentTheme } = useThemeStore();

  // Change theme when system theme updates
  useEffect(
    () => {
      const setSystemTheme = () => {
        if (currentTheme === 'system') {
          changeTheme('system');
        }
      };

      const mq = window.matchMedia('(prefers-color-scheme: dark)');

      mq.addEventListener('change', setSystemTheme);

      return () => mq.removeEventListener('change', setSystemTheme);
    },
    // You need this dependencies or the listener will never update current theme value
    [currentTheme, changeTheme]
  );

  // useEffect(() => console.log(currentTheme), [currentTheme]);

  return (
    <div className="flex gap-2">
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

      {themes.map((theme) => (
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
