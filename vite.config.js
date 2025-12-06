import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		postcss: {
			plugins: [autoprefixer()]
		},
		preprocessorOptions: {
			scss: {
				// ⭐️ Используем @use (новый синтаксис Sass)
				// 'as *' делает переменные и миксины доступными глобально без префикса
				additionalData: `@use 'src/styles/variables' as *; @use 'src/styles/mixins' as *;`
			}
		},
	},
});