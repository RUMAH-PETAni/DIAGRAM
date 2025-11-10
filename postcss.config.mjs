/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 3,
      browsers: 'last 3 versions, > 1%, not dead',
    },
  },
};

export default config;
