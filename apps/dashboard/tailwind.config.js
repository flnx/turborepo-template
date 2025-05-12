import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    "// './src/layouts/**/*.{js,ts,jsx,tsx,mdx}'",
    "// './src/pages/**/*.{js,ts,jsx,tsx,mdx}'",
    "// './src/components/**/*.{js,ts,jsx,tsx,mdx}'",
    './node_modules/@heroui/theme/dist/components/(button|card|checkbox|chip|dropdown|input|link|modal|number-input|progress|select|ripple|spinner|form|menu|popover|listbox|scroll-shadow).js',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.0155rem',
      },
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [heroui()],
};
