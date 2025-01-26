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
        error: 'var(error)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'text-color': 'var(text-color)',
        'input-color': 'var(input-color)',
        muted: 'var(muted)',
      },
    },
  },
  plugins: [],
} satisfies Config;
