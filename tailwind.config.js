/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,scss,html}', './node_modules/@horizon/**/*.{vue,scss,html}'],
  theme: {
    extend: {
      borderRadius: {
        radius: '0.75rem',
      },
      colors: {
        primary: '#0d1b44',
        'primary-hover': '#0a1535', // Un tono más oscuro para hover
        'primary-active': '#08102a', // Un tono aún más oscuro para el estado activo

        secondary: '#1e2a64',
        'secondary-hover': '#18225b', // Un tono más oscuro para hover
        'secondary-active': '#141e4e', // Un tono más oscuro para el estado activo

        accent: '#f49342',
        'accent-hover': '#e7823b', // Un tono más oscuro para hover
        'accent-active': '#d27334', // Un tono más oscuro para el estado activo

        disabled: '#d1d3d8',

        highlight: '#2ca6f7',
        'highlight-hover': '#2496e0', // Un tono más oscuro para hover
        'highlight-active': '#1d86c8', // Un tono más oscuro para el estado activo

        light: '#f2f3f8',
        'light-hover': '#e1e3ec', // Un tono más oscuro para hover
        'light-active': '#d0d3e0', // Un tono más oscuro para el estado activo

        neutral: '#c5c7d0',
        'neutral-hover': '#a9abb6', // Un tono más oscuro para hover
        'neutral-active': '#8d8f9c', // Un tono más oscuro para el estado activo

        success: '#60c18c',
        'success-hover': '#53b67d', // Un tono más oscuro para hover
        'success-active': '#46a56f', // Un tono más oscuro para el estado activo

        danger: '#e76a6a',
        'danger-hover': '#d15e5e', // Un tono más oscuro para hover
        'danger-active': '#b75353', // Un tono más oscuro para el estado activo

        text: '#3c3f4e',
        'text-hover': '#353740', // Un tono más oscuro para hover
        'text-active': '#2e2f39', // Un tono más oscuro para el estado activo

        white: '#f8f8f8', // Blanco ceniza muy suave
        'white-hover': '#e4e4e4', // Un blanco ligeramente más oscuro para hover
        'white-active': '#d9d9d9', // Un blanco ligeramente más oscuro para el estado activo
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
