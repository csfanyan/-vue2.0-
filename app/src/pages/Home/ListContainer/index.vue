<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <div class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="carousel in bannerList"
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
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from "swiper";

// 引入vuex的数据等
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("home", ["bannerList"]),
  },
  watch: {
    immediate:true, //listContainer并不需要这个。只是为了和floorlist保持一致，做出来一个全局组件
    // 轮播图解决方式2：
    // 用watch监听computed中的bannerList属性，如果bannerList发生过变化--由空数组变为数组里面有四个元素
    // 就会执行handler里面的内容
    // 但是还有个问题，我们这样数据监听，只能保证bannerList已经有值了，但不能保证.swiper-container里面的v-for循环执行完了
    // 而swiper要在dom渲染完毕后才能起作用，这样同样还是有问题
    // 所以还要配合$nextTick使用
    bannerList: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper-container", {
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
        })
      },
    },
  },

  mounted() {
    // console.log("组件的mounted");

    // 获取轮播图的数据，并且存储在vuex的state当中
    this.$store.dispatch("home/getBannerList");

    // console.log('初始化swiper实例');
    // 打印顺序：组件的mounted---在向服务器发送ajax请求，获取轮播图的数据---初始化swiper实例---在修改仓库中的bannerList数据
    // 初始化实例，在获取到bannerlist之前了。这显然是不行的

    // 在new Swiper之前，页面中dom结构必须有。也就是图片什么的都应该被加载完毕
    // 但把new Swiper实力放在这里，是不行的
    // 为什么：结构还不完整
    // 张老师讲的生命周期是没问题的，在不涉及axios的情况下，的确是组件加载完毕，dom显示后才执行mounted()
    // 但是在使用axios时，涉及到异步了，这个就不一定了。见上面三个console.log()
    // var mySwiper = new Swiper(".swiper-container", {
    // });

    // 轮播图解决方式1：
    // 讲new Swiper放在setTimeout里面--这种解决方式不完美
    // 最终解决方案是用数据监听watch
    // setTimeout(() => {
    //   var mySwiper = new Swiper(".swiper-container", {
    //     loop: true, // 循环模式选项
    //     // 如果需要分页器
    //     pagination: {
    //       el: ".swiper-pagination",
    //       // 点击小球的时候，也能进行切换
    //       clickable:true
    //     },
    //     // 如果需要前进后退按钮
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },
    //     // 如果需要滚动条
    //     scrollbar: {
    //       el: ".swiper-scrollbar",
    //     },
    //   });
    // },1000);
  },
};
</script>

<style scoped lang='less']>
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(./images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>