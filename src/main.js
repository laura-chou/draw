import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2'
import VueLuckyCanvas from '@lucky-canvas/vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPenToSquare, faTrashAlt, faUndo, faSave, faRotate, faEraser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'sweetalert2/dist/sweetalert2.min.css'
import './registerServiceWorker'

Vue.use(VueLuckyCanvas)
const options = {
  allowOutsideClick: false,
  confirmButtonText: '確定',
  confirmButtonColor: '#0072E3',
  cancelButtonText: '取消',
  cancelButtonColor: '#d33',
  reverseButtons: true
}
Vue.use(VueSweetalert2, options)

library.add(faPenToSquare, faTrashAlt, faUndo, faSave, faRotate, faEraser)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
