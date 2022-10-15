<template>
  <!-- home和search都会用到typeNav组件，所以要将typeNav注册为全局组件
       一般components文件夹下放全局组件，pages文件夹下放局部组件所以这个就放到components下面了
   -->
  <div class="type-nav">
    <div class="container">
      <!-- 这部分是全部商品分类的容器，包括全部商品分类，以及全部商品分类里面的三级菜单 -->
      <div @mouseleave="leaveshow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级菜单的过度动画 -->
        <transition name="sort">
          <!-- sort是三级菜单的容器 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <!-- 一级信息是图书、音像、电子书刊  手机 等左边侧边栏的名字-->
              <!-- :class="{cur:currentIndex==inedx}"是动态绑定class的第三种写法。第三种写法就是 {cur:true，cur:false}这种形式 
           currentindex是目前鼠标移动到的一级分类上的index，index是每个一级分类遍历时得到的index。所以如果currentindex如果和index相等了，就说明鼠标移动到了这个一级分类上
              这个语句的意思是，鼠标移动到谁身上，谁身上就会拥有.cur这个class       
          -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <!-- @mouseleave="leaveshow">不应该加在h3上，不然鼠标移出h3一级信息，二三级分类容器就会直接消失，没法点里面的东西了 -->
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1ID="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类容器-->
                <!-- 二级 -->
                <!-- 二级信息是一级信息的categoryChild -->
                <!-- :style="{display:currentIndex == index?'block':'none'}是vue控制样式的对象式。如果鼠标移动到了一级分类标签上，
                  二三级分类的容器的display就为block，显示，否则就为none，隐藏 
                  当然也可以通过currentIndex是否为-1进行操作。为-1的话就隐藏，否则就显示
             -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 of c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2ID="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <!-- 三级 -->
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3ID="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 三级联动 -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入节流模块
// 引入模块、插件时，'app/node_modules'可以省略？也就是可以直接写node_modules里面的路径？
// 这里是只引入了lodash中的throttle函数
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      // -1代表的是没有移动到任何一个一级分类上。不能写0，0代表一级分类的第一个
      currentIndex: -1,

      //
      show: true,
    };
  },
  computed: {
    // 从仓库中获取categoryLsit的数据
    // ...mapState("home", ["categoryList"]),
    ...mapState("home", { categoryList: "categoryList" }),
  },
  methods: {
    // 鼠标进入一级分类标签，修改currentIndex
    // changeIndex(index){
    //   // 正常情况(用户慢慢操作):鼠标进入，没一个一级分类h3，都会触发鼠标进入时间
    //   // 非正常情况(用户操作很快)：本身全部的一级分类，都应该触发鼠标进入事件，但经过测试，只有部分h3触发了
    //   // 就是由于用户的行为过快，导致浏览器反应不过来。如果当前的回调函数中有一些大量业务，有可能出现卡顿效果
    //   this.currentIndex = index;
    //   console.log(this.currentIndex);
    // },

    // 对changeindex方法使用节流
    // _.throttle是一个封装了setTimeout的语法糖，每50ms内，只有第一次执行changeIndex才会生效
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
      // console.log(this.currentIndex);
    }, 30),

    // 鼠标从商品分类容器中移出(除商品分类标签外，还有三级联动区域。绑定在最外层的div父容器上后，子元素通过事件委派也能触发)
    leaveshow() {
      // 鼠标移出三级联动区域，修改currentIndex为-1，代表当前鼠标不在任何一个一级标题上
      this.currentIndex = -1;

      // 当不在home路由中时，如果鼠标移开全部商品分类的容器，让商品分类列表进行隐藏
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },

    // 进行路由跳转
    goSearch(event) {
      // 最好的解决方案：编程时导航 + 事件委派
      // 利用事件委派，存在一些问题：
      // 1.无法知道点击的一定是a标签。因为只有a标签需要调用goSearch方法，进行跳转
      // 2.如何获取参数【1、2、3级分类的产品的名字、id】
      // 解决方式：
      //1. 给a标签加自定义属性data-categoryName。该data-categoryName的标签，就是a标签
      let element = event.target;
      // 节点有一个dataset属性，可以获取节点的自定义属性与属性值，并存储在一个对象中
      // 因此我们可以使用解构的方式，直接获取categoryname
      // 要注意，所有自定义属性，都会被编译器转换成小写。所以我们也只能通过小写获取
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {

        // 现在我们已经知道点击的是a标签了
        // 然后要区分点击的是一级a标签，还是二级a标签，还是三级a标签
        // 再给a标签加一个自定义属性， :data-category1ID='c1.categoryId'是1级标签， :data-category2ID='c2.categoryId'是二级标签
        // locaton是路由配置对象
        let location = { name: "search" }; 
        let query = { categoryname: categoryname };

        // 一级分类
        if (category1id) {
          query.category1id = category1id;
        } else if (category2id) {
          // 二级分类
          query.category2id = category2id;
        } else if (category3id) {
          // 三级分类
          query.category3id = category3id;
        }

        // 将query拼接到location里面
        location.query = query;
        this.$router.push(location);


        // 参数合并
        // 点击商品分类进行路由跳转时，带的是query参数；点击搜索进行路由跳转时，带的是params参数
        // 过程：在搜索栏输入东西，跳转。   然后再点击三级联动菜单，跳转
        // 1.点击搜索栏进行路由跳转后，跳转到的路由组件中，就得到了params参数
        // 2.此时我们如果再点击三级联动菜单，再次跳转，因为三级联动菜单带的是params参数，而我们想把当前路由组件的params参数，一起传过去
        // 所以跳转之前，就得进行一个判断：
        // 如果路由跳转的时候，带有params参数，就拼接到location当中，一起传递过去。如果没有，就不用走这个if了
        if (this.$route.params) {
          location.params = this.$route.params;
        }

      }
    },

    // 当鼠标移入全部商品分类的时候，让商品分类列表进行展示
    enterShow() {
      this.show = true;
    },
  },
  // 组件挂在完毕，就可以向服务器发送请求了
  mounted() {
    // 通知vuex我们发请求了，获取数据，并且存储于仓库的data当中
    // 然后我们就能通过$store.state，获取到data中categoryList存储的数据了
    // 之所以不放在这里了：
    // 每次实例化该组件，都会发一次请求，让仓库的state获取服务器的数据，这显然非常浪费性能。
    // 这种只需要执行一次的代码，可以放在只执行一次的vue组件的mounted()中，比如app组件
    // this.$store.dispatch("home/categoryList");

    // 当组件挂载完毕，如果当前组件不是home，而是在在search等路径下，就让show属性变为false
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },

  updated() {},
  
};
</script>

<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        // 谁身上又.cur这个class，谁就拥有这个样式
        .cur {
          background: skyblue;
        }
      }
    }

    // .sort过渡动画
    // 从隐藏到显示：
    // 过渡动画是由隐藏到显示状态变化时，才会触发。所以只有search等路由中的三级分类菜单，才会有过渡动画效果
    // home页面中因为三级菜单本来就处于显示状态，所以不会有过渡动画效果
    .sort-enter {
      height: 0px;
    }
    .sort-enter-active {
      transition: height 0.1s linear;
    }
    /* 进入的终点、离开的起点 */
    .sort-enter-to {
      height: 461px;
    }

    // // 从显示到隐藏：
    // .sort-leave {
    //   height: 461px;

    // }
    // .sort-leave-active {
    //   transition: height 0.5s linear;
    // }
    // /* 进入的终点、离开的起点 */
    // .sort-leave-to {
    //  height: 0px;
    // }
  }
}
</style>