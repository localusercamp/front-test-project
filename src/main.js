import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import headerMixin from './mixins/headerMixin'

const app = createApp(App)

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
})
app.config.globalProperties.$axios = axiosInstance

app.use(store).use(router).mixin(headerMixin)

app.mount('#app')
