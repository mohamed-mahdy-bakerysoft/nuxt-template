import {
  orange,
  lime,
  pink,
  teal,
  blueGray,
  rose,
  green,
  fontSize,
  fontFamily,
  screens,
  gradient1,
  gradient2
} from './libs/sdk-ts/packages/ui/tailwindConfig'

/** @type {import('tailwindcss').Config} */

export const primary = orange
export const secondary = lime
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './content/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primary,
        secondary,
        lime,
        orange,
        pink,
        teal,
        blueGray,
        rose,
        green
      },
      backgroundImage: {
        gradient1,
        gradient2
      },
      fontSize,
      fontFamily,
      screens
    }
  },
  plugins: []
}
