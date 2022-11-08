import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';

import Toast from "vue-toastification";

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import '@/styles/normalizer.css';
import '@/styles/theme.css';
import '@/styles/global.css';
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(Quasar, {
  plugins: {},
})
app.use(Toast, {});
app.use(createPinia());
app.use(router);
app.mount('#app');

