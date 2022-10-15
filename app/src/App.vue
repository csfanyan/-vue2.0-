<template>
  <div>
       <Header></Header>
      <!-- 路由组件出口的地方 -->
      <router-view></router-view>
      <!-- 在主页面、搜索栏路由使用显示。在登录、注册路由使用时隐藏 -->
      <Footer v-show="$route.meta.show"> </Footer>
  </div>
</template>

<script>

// 引入
import Header from './components/Header/index.vue';
import Footer from './components/Footer/inedx.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },

  mounted() {
    // 派发一个action||获取商品分类的三级列表的数据
    // 执行过这行代码，vuex的state中就会存储获取到的数据了。然后我们就能通过$store.state.*读取到数据了
      this.$store.dispatch("home/categoryList");
  },
}
</script>

<style>

</style>
