import { createApp } from 'vue';
import App from '@/App.vue';
import { apolloProvider } from '@/apollo';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(apolloProvider);
app.mount('#app');
