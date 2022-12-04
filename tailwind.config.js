/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        'custom-light': {
          'color-scheme': 'light',
          primary: '#9B76A7',
          'primary-content': '#F9FAFB',
          secondary: '#f6cbd1',
          accent: '#b4e9d6',
          neutral: '#F6F3F7',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
        },
      },
      {
        'dracula-custom': {
          'color-scheme': 'dark',
          primary: '#bd93f9',
          secondary: '#ff79c6',
          accent: '#78E392',
          neutral: '#414558',
          'base-100': '#282a36',
          'base-content': '#f8f8f2',
          info: '#8be9fd',
          success: '#50fa7b',
          warning: '#f1fa8c',
          error: '#ff5555',
        },
      },
    ],
    darkTheme: 'dracula-custom',
  },
};
