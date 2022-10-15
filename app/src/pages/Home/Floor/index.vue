<template>
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ list.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li class="active">
              <a href="#tab1" data-toggle="tab">热门</a>
            </li>
            <li>
              <a href="#tab2" data-toggle="tab">大家电</a>
            </li>
            <li>
              <a href="#tab3" data-toggle="tab">生活电器</a>
            </li>
            <li>
              <a href="#tab4" data-toggle="tab">厨房电器</a>
            </li>
            <li>
              <a href="#tab5" data-toggle="tab">应季电器</a>
            </li>
            <li>
              <a href="#tab6" data-toggle="tab">空气/净水</a>
            </li>
            <li>
              <a href="#tab7" data-toggle="tab">高端电器</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in list.keywords" :key="index">
                  {{ keyword }}
                </li>

                <li>电热水器</li>
              </ul>
              <img :src="list.imgUrl" />
            </div>
            <div class="floorBanner">
              <!-- floor轮播 -->
              <!-- <Carousel :list='list.carouselList'/> -->
              <div class="swiper-container" ref="floor1Swiper">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(carousel, index) in list.carouselList"
                    :key="carousel.id"
                  >
                    <img :src="carousel.imgUrl" />
                  </div>
                </div>

                <div class="swiper-pagination"></div>

                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img src="./images/floor-1-2.png" />
              </div>
              <div class="floor-conver-pit">
                <img src="./images/floor-1-3.png" />
              </div>
            </div>
            <div class="split center">
              <img src="./images/floor-1-4.png" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img src="./images/floor-1-5.png" />
              </div>
              <div class="floor-conver-pit">
                <img src="./images/floor-1-6.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";

import Swiper from "swiper";

export default {
  name: "Floor",
  computed: {
    // 不能在这里获取floorList
    // 因为有两个floor组件，且每个组件用的都是floorList中的数据，所以发请求可以在home路由组件中发，然后给对应的floor实例分配数据
    // ...mapState('home',['floorList'])
  },

  props: ["list"],
  // watch: {
  //   list: {
  //     // 因为组件实例化后，list就不再改变了。如果想让list中的handler上来就执行一次，就需要immediate
  //     // 这里为全局组件做准备
  //     immediate: true,
  //     handler() {
  //       // 如果放在数据监听这里，我们同样只能监听到数据有了，但v-for是否渲染完，我们是不知道的。所以还是要用nexttick
  //       this.$nextTick(() => {
  //         var mySwiper = new Swiper(this.$refs.floor1Swiper, {
  //           loop: true, // 循环模式选项
  //           // 如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination",
  //             // 点击小球的时候，也能进行切换
  //             clickable: true,
  //           },
  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },
  //           // 如果需要滚动条
  //           scrollbar: {
  //             el: ".swiper-scrollbar",
  //           },
  //         });
  //       });
  //     },
  //   },
  // },
  mounted() {
    // 在floor中，轮播图是可以在这里写的
    // 因为获取floor.json的请求，是在外部发的，是获取完数据后，才实例化的floor组件
    // 所以floor的mounted()，一定是在dom完全渲染后，才执行的
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

  },
};
</script>

<style scoped lang='less'>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>