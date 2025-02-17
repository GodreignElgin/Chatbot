import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
],
  theme: {
    extend: {
      maxHeight: {
        '10-lines': '240px', // Approximate height for 10 lines of text
      },
    },
  },
  plugins: [],
};

export default config;
