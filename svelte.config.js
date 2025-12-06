import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Активация Runes Mode (Svelte 5)
  compilerOptions: {
    runes: true,
  },

  kit: {
    adapter: adapter({
      fallback: '200.html' // Для SPA на GH Pages
    }),
    paths: {
      base: process.env.VITE_BASE_PATH || '', // Для GH Pages
    },
    prerender: {
      entries: ['*']
    }
  }
};
export default config;