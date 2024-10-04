const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: { 'main-bg': 'var(--main-bg)' },
      fontFamily: {
        sans: ['var(--font-work-sans)', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'main-bg': 'rotate 30s cubic-bezier(0.8, 0.2, 0.2, 0.8) infinite',
      },
      backgroundImage: {
        'primary-glow':
          'conic-gradient(from 90deg at 50% 50%, oklch(var(--p) / 80%) 0%, oklch(var(--s) / 80%) 33%, oklch(var(--a) / 80%) 66%, oklch(var(--p) / 80%) 100%)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          'color-scheme': 'light',
          primary: '#871D39', // BF7892 F2C2CF 8C2A3C
          secondary: '#F2C2CF',
          accent: '#46328C',
          neutral: '#FEFBFC', // #FEFBFC
          'base-100': '#FCFCFC',
          'base-200': '#F7F7F7',
          'base-300': '#EBEBEB',
          '--main-bg': '#FCFCFC', // '--main-bg': '#E2E8F0', opacity: B3/70%
        },
      },
      {
        dark: {
          'color-scheme': 'dark',
          primary: '#bd93f9',
          secondary: '#78E392',
          accent: '#ff79c6',
          neutral: '#414558',
          'base-100': '#282a36',
          'base-content': '#f8f8f2',
          info: '#8be9fd',
          success: '#50fa7b',
          warning: '#f1fa8c',
          error: '#ff5555',
          '--main-bg': '#121217',
        },
      },
    ],
    darkTheme: 'dark',
  },
};
