// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(avatar|badge|button|calendar|card|checkbox|chip|divider|dropdown|input|link|modal|navbar|number-input|popover|progress|select|tabs|ripple|spinner|form|menu|listbox|scroll-shadow).js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};