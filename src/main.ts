import { createApp } from 'vue';
import './style/style.css';
import router from './router';
import i18n from './lang';
import store from './store';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(store);

app.mount('#app');
