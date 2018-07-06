import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'common/scss/index.scss'
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
import 'common/js/rem.js'
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
import axios from 'axios'; //引入文件
//vuex
import store from './store'
Vue.prototype.$http = axios; //将axios挂载到Vue实例中的$ajax上面,在项目中的任何位置通过this.$http使用
Vue.use(YDUI);
fastclick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
const vue=new Vue({
  el: '#app',
  router,
  store,//使用store
  render: h => h(App)
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  vue.$store.dispatch('switch_dialog')
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
 /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
});
router.afterEach((to, from, next) => {
  setTimeout(function(){
  	 vue.$store.dispatch('switch_dialog1')
  })
  
});
