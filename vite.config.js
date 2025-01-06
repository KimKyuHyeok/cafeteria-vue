import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
		extensions: ['.js', '.vue', '.json'], // 여기에 '.vue' 추가
	},
	server: {
		host: '0.0.0.0',
		port: 80,
		fs: {
			exclude: ['.git']
		},
		hmr: {
			overlay: false
		},
	}
})
