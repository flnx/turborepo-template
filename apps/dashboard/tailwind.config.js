// tailwind.config.js
const { heroui } = require('@heroui/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@heroui/theme/dist/components/(accordion|avatar|badge|button|calendar|card|checkbox|chip|divider|dropdown|input|link|listbox|modal|navbar|number-input|popover|progress|scroll-shadow|select|spacer|tabs|ripple|spinner|form|menu).js',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [heroui()],
};
