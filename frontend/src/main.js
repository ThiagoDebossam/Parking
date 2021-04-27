import Vue from 'vue'
import App from './App.vue'
import '../msg'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import './axios'
import VueMask from 'v-mask'
Vue.config.productionTip = false
Vue.use(VueMask)

// require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywibmFtZSI6ImpvYW8iLCJlbWFpbCI6ImpvYW8yQGdtYWlsLmNvbSIsImlhdCI6MTYxOTM4ODk3MSwiZXhwIjo0MTk3NDU2MjEyODMyMDB9.zCn-mi3xUHHWzPVH-yAdkvz2uxBTjHifBezAnwnV6u0'


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
