import Vue from 'vue'
import App from './App.vue'
import '../msg'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/store'
import VueMask from 'v-mask'
import './axios'
Vue.config.productionTip = false
Vue.use(VueMask)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
