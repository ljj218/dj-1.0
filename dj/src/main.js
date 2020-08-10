import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import "./assets/css/reset.css"
Vue.config.productionTip = false
Vue.prototype.cookies = Cookies;
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import "./assets/css/animate.css"
import 'swiper/swiper-bundle.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css'
import './assets/icon/tim.css'
import tim from './tim'
import TIM from 'tim-js-sdk'
window.tim = tim
window.TIM = TIM
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM

Vue.use(ElementUI);
Vue.use(ViewUI);

if (Number.parseInt === undefined) Number.parseInt = window.parseInt;
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;


router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {
  // console.log();
  window.scrollTo(0,0);
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
