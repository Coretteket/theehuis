const tailwindcss = require('tailwindcss');
const postcssShortVar = require('postcss-short-var');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

const config = {
  plugins: [
    postcssShortVar,
    postcssPresetEnv({
      stage: 0,
      importFrom: './src/app.css',
      // TODO: stay alert to future importFrom deprecation
      features: {
        'custom-properties': { disableDeprecationNotice: true },
      },
    }),
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    tailwindcss(),
    //But others, like autoprefixer, need to run after,
    cssnano,
  ],
};

module.exports = config;
