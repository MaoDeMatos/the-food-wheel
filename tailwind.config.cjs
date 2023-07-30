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
          '--main-bg': '#FCFCFC', // '--main-bg': '#E2E8F0',
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
