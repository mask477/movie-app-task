import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        error: 'var(--error)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        textColor: 'var(--text-color)',
        input: 'var(--input-color)',
        muted: 'var(--muted)',
      },
      ringColor: {
        DEFAULT: 'var(--primary)',
      },
      fontSize: {
        base: ['16px', { lineHeight: '24px', fontWeight: '500' }],
        xs: ['12px', { lineHeight: '24px', fontWeight: '500' }],
        sm: ['14px', { lineHeight: '24px', fontWeight: '500' }],
        md: ['16px', { lineHeight: '24px', fontWeight: '500' }],
        lg: ['20px', { lineHeight: '32px', fontWeight: '500' }],
        h6: ['16px', { lineHeight: '24px', fontWeight: '800' }],
        h5: ['20px', { lineHeight: '24px', fontWeight: '800' }],
        h4: ['24px', { lineHeight: '32px', fontWeight: '800' }],
        h3: ['32px', { lineHeight: '40px', fontWeight: '600' }],
        h2: ['48px', { lineHeight: '56px', fontWeight: '600' }],
        h1: ['64px', { lineHeight: '80px', fontWeight: '600' }],
      },
      container: {
        center: true, // Centers the container
        padding: '1rem', // Adds padding to the container
        screens: {
          sm: '540px', // Similar to Bootstrap's container-sm
          md: '720px', // Similar to Bootstrap's container-md
          lg: '960px', // Similar to Bootstrap's container-lg
          xl: '1140px', // Similar to Bootstrap's container-xl
          '2xl': '1320px', // Matches Bootstrap 5's container-xxl
        },
      },
    },
  },

  plugins: [],
} satisfies Config;
