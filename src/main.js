import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import headerMixin from './mixins/headerMixin'

createApp(App).use(store).use(router).mixin(headerMixin).mount('#app')
