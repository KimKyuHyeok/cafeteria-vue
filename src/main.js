import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import axios from 'axios'



const app = createApp(App)
app.use(router)

axios.defaults.withCredentials = true

axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

app.mount('#app')
