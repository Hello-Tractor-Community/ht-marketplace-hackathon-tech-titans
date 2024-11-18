/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sunsetBlaze: {
          DEFAULT: '#ff461e',
          80: '#ff6e4c',
          60: '#ff957a',
          40: '#ffbba8',
          20: '#ffd2c7',
        },
        hibiscus: {
          DEFAULT: '#f8285f',
          80: '#fa5480',
          60: '#fc7f9f',
          40: '#fdabbf',
          20: '#ffd5df',
        },
        sage: {
          DEFAULT: '#93c393',
          80: '#a8d1a8',
          60: '#bcdcbc',
          40: '#d1e7d1',
          20: '#e5f3e5',
        },
        summerBreeze: {
          DEFAULT: '#93c2c6',
          80: '#a8d0d3',
          60: '#bcdede',
          40: '#d1ebeb',
          20: '#e5f7f7',
        },
        plum: {
          DEFAULT: '#2f1c54',
          80: '#473b6e',
          60: '#5e5a88',
          40: '#7679a1',
          20: '#8d98bb',
        },
        charcoal: {
          DEFAULT: '#161616',
          80: '#333333',
          60: '#4d4d4d',
          40: '#666666',
          20: '#808080',
        },
      },
    },
  },
  plugins: [],
};
