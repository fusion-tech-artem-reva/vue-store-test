import { createApp } from 'vue'
import { createPinia } from 'pinia';
import Toast from "vue-toastification";
import '@/styles/normalizer.css';
import '@/styles/theme.css';
import '@/styles/global.css';
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/user';

const app = createApp(App)

app.use(Toast, {});
app.use(createPinia());
app.use(router);
app.mount('#app');

