// tailwind.config.js
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
         explode: {
           '0%': { transform: 'scale(0.95)', opacity: '0.5' },
           '100%': { transform: 'scale(1.5)', opacity: '0' },
         },
      },
      animation: {
         explode: 'explode 1s forwards',
      },
      // Newly added styles
      spacing: {
        '20': '5rem',
      },
      boxShadow: {
        modal: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      },
      fontSize: {
        '20': '1.25rem',
      },
    },
  },
  plugins: [require('daisyui')],
};

export default config;
