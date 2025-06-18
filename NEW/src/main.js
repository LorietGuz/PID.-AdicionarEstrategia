import { createApp } from 'vue';
import App from './App.vue';
import Vue3Quill from 'vue3-quill';
import 'quill/dist/quill.snow.css';

const app = createApp(App);
app.use(Vue3Quill);
app.mount('#app');
