import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import store from '@/store'
import '@/mock/mockServer'
import Carousel from '@/components/Carousel'
Vue.config.productionTip = false
import 'swiper/swiper-bundle.min.css'
import Pagination from '@/components/Pagination'
import { MessageBox } from 'element-ui';
//引入接口
import * as API from '@/api'
//图片懒加载
import VueLazyload from 'vue-lazyload'
//引入图片
import sd from '@/assets/sd.gif'
Vue.use(VueLazyload, {
  loading: sd
})
//引入表单验证
import '@/pihgins/validate'
Vue.component(Pagination.name, Pagination)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
