import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server:{
		port:9090,
	},
	css: {
		postcss: './postcss.config.js'
	}
});
