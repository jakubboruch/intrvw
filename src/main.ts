import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import httpInterceptor from "@/api/httpInterceptor";

createApp(App).use(store).use(httpInterceptor).use(router).mount('#app')
