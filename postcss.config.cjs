const tailwindcss = require('tailwindcss');
const postcssShortVar = require('postcss-short-var');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		postcssShortVar,
		postcssPresetEnv({ stage: 0 }),
		cssnano,
	],
};

module.exports = config;
