import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';
import makeAttractionsImporter from 'attractions/importer.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,

      scss: {
        importer: makeAttractionsImporter({
          themeFile: './src/vars.scss',
        }),
      },
    }),
  ],

  kit: {
    adapter: adapter({ edge: true }),
  },
};

export default config;
