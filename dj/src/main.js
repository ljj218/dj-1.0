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
import {config} from "./common/config"
import VueQriously from 'vue-qriously'
import TIM from 'tim-js-sdk';
import COS from "cos-js-sdk-v5";

let options = {
  SDKAppID: 1400408859 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
};
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
let tim = TIM.create(options); // SDK 实例通常用 tim 表示

// 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
// tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用

// 注册 COS SDK 插件
tim.registerPlugin({'cos-js-sdk': COS});

Vue.use(VueQriously)
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

Vue.filter('phone', (val) => {
  if (!val) return;
  return val.slice(0,3)+'****'+val.slice(7,11);
})
Vue.filter('posplayer', (val) => {
  if (!val) return;
  let arr=val.split(',');
  let arrays=[];
  for (let j = 0; j < arr.length; j++) {
    for (let i = 0; i < config.posPlayer.length; i++) {
      if(config.posPlayer[i].value==String(arr[j])){
        arrays.push(config.posPlayer[i].label);
      }
     }
  }
  return arrays.join(',')
 
})
// birthDate
Vue.filter('birthDate', (val) => {
  if (!val) return '';
  let time =new Date();
  let y=time.getFullYear();
  let userY=val.split('-')[0];
  return y-userY
 
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
