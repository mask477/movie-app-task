import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
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
        base: [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '700',
          },
        ],
        xs: [
          '12px',
          {
            lineHeight: '24px',
            fontWeight: '500',
          },
        ],
        sm: [
          '14px',
          {
            lineHeight: '24px',
            fontWeight: '500',
          },
        ],
        md: [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '500',
          },
        ],
        lg: [
          '20px',
          {
            lineHeight: '32px',
            fontWeight: '500',
          },
        ],
        h6: [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '800',
          },
        ],
        h5: [
          '20px',
          {
            lineHeight: '24px',
            fontWeight: '800',
          },
        ],
        h4: [
          '24px',
          {
            lineHeight: '32px',
            fontWeight: '800',
          },
        ],
        h3: [
          '32px',
          {
            lineHeight: '40px',
            fontWeight: '600',
          },
        ],
        h2: [
          '48px',
          {
            lineHeight: '56px',
            fontWeight: '600',
          },
        ],
        h1: [
          '64px',
          {
            lineHeight: '80px',
            fontWeight: '600',
          },
        ],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '540px',
          md: '720px',
          lg: '960px',
          xl: '1140px',
          '2xl': '1320px',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },

  plugins: [require('tailwindcss-animate')],
} satisfies Config;
