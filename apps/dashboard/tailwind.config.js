// tailwind.config.js
const { heroui } = require('@heroui/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@heroui/theme/dist/components/(accordion|avatar|badge|button|calendar|card|checkbox|chip|divider|dropdown|form|input|link|listbox|modal|navbar|number-input|popover|progress|scroll-shadow|select|spacer|tabs|toast|ripple|spinner|menu).js',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [heroui()],
};
