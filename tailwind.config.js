/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['false', '[data-mode="light"]'],
	content: [
	  "./index.html",
	  "./src/**/*.{vue,js,ts,jsx,tsx}",
	],  theme: {
    extend: {},
  },
  plugins: [],
}

