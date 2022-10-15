import Vue from 'vue'
import App from './App.vue'

// 注册全局组件
// 三级联动组件
import TypeNav from '@/components/TypeNav/index'
Vue.component(TypeNav.name, TypeNav)
// 注册轮播图组件
import Carousel from '@/components/Carousel';
Vue.component(Carousel.name, Carousel);


// 引入路由
import router from '@/router/index'

// 引入仓库
import store from '@/store/index'

Vue.config.productionTip = false

// 引入MockServer.js---mock数据
// 因为mockServe里面的代码要执行一次，所以就在入口文件这里import一次
// 注释：在js脚本中。如果想引入另一个js、css等文件，可以直接使用import ""。
// 当然 import a from '@/mock/mockServe' 也可以。只不过我们并不需要使用引入得到的变量，所以用上面的形式即可
import '@/mock/mockServe';

// 引入swiper样式
// 因为home页面上面和下面多个地方都用到了轮播图，所以可以在这里引入swiper样式。vue有样式汇总原则，style上不写scoped，整个项目的组件都能使用
// 如果想在js文件中引入css，只能通过import "***"的方式!
// 至于路径名，和引入进度条的原理一样
import 'swiper/css/swiper.css'

new Vue({
  el:'#app',
  render: h => h(App),
  // 注册路由
  router,
  // 注册仓库
  store
})
