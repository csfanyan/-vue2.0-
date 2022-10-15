<template>
  <div>
    <div class="swiper-container" ref="floor1Swiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(carousel, index) in list"
          :key="carousel.id"
        >
          <img :src="carousel.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  data() {
    return {
      abc: 123,
    };
  },
  watch: {
    list: {
      // 因为组件实例化后，list就不再改变了。如果想让list中的handler上来就执行一次，就需要immediate
      // 这里为全局组件做准备
      immediate: true,
      handler() {
        // 如果放在数据监听这里，我们同样只能监听到数据有了，但v-for是否渲染完，我们是不知道的。所以还是要用nexttick
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击小球的时候，也能进行切换
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>