/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,scss,html}', './node_modules/@horizon/**/*.{vue,scss,html}'],
  theme: {
    extend: {
      borderRadius: {
        radius: '0.75rem',
      },
      boxShadow: {
        'bottom-light':
          '0px 4px 6px -4px rgba(1, 15, 49, 0.12), 0px 8px 8px -4px rgba(1, 15, 49, 0.08)',
        'bottom-medium':
          '0px 8px 18px -6px rgba(1, 15, 49, 0.12), 0px 12px 42px -4px rgba(1, 15, 49, 0.12)',
        'bottom-strong':
          '0px 8px 28px -6px rgba(1, 15, 49, 0.12), 0px 18px 88px -4px rgba(1, 15, 49, 0.14)',
        'top-light':
          '0px -4px 6px -4px rgba(1, 15, 49, 0.12), 0px -8px 8px -4px rgba(1, 15, 49, 0.08)',
        'top-medium':
          '0px -8px 18px -6px rgba(1, 15, 49, 0.12), 0px -12px 42px -4px rgba(1, 15, 49, 0.12)',
        'top-strong':
          '0px -8px 28px -6px rgba(1, 15, 49, 0.12), 0px -18px 88px -4px rgba(1, 15, 49, 0.14)',
      },
      colors: {
        primary: '#0d1b44',
        'primary-hover': '#0a1535',
        'primary-active': '#08102a',

        secondary: '#1e2a64',
        'secondary-hover': '#18225b',
        'secondary-active': '#141e4e',

        accent: '#f49342',
        'accent-hover': '#e7823b',
        'accent-active': '#d27334',

        disabled: '#d1d3d8',

        highlight: '#2ca6f7',
        'highlight-hover': '#2496e0',
        'highlight-active': '#1d86c8',

        light: '#f2f3f8',
        'light-hover': '#e1e3ec',
        'light-active': '#d0d3e0',

        neutral: '#c5c7d0',
        'neutral-hover': '#a9abb6',
        'neutral-active': '#8d8f9c',

        success: '#60c18c',
        'success-hover': '#53b67d',
        'success-active': '#46a56f',

        danger: '#e76a6a',
        'danger-hover': '#d15e5e',
        'danger-active': '#b75353',

        text: '#3c3f4e',
        'text-hover': '#353740',
        'text-active': '#2e2f39',

        white: '#f8f8f8',
        'white-hover': '#e4e4e4',
        'white-active': '#d9d9d9',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
