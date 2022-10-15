// 引入api文件夹下index文件中封装过的axios
import { reqCategoryList,reqBannerList,reqFloorList } from '@/api/index'

export default {
    namespaced: true,
    actions: {

        // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
        // 因为reqCategoryList()返回值是一个promise，为了从promise从取数据，所以要用到async和await
        async categoryList(context) {
            // let result = reqCategoryList();
            // console.log(result);
            // 用await取得reqCategoryList()这个promise成功的数据
            // reqCategorylist()，就是执行这个函数了！也也就是在这里发送的axios请求！
            let result = await reqCategoryList();
            // 商品列表数据中code值为200。data为商品数据信息
            if (result.code == 200) {
                context.commit('GETCATEGORYLIST', result.data);
            }

        },
        
        async getBannerList(context){
            // console.log("在向服务器发送ajax请求，获取轮播图的数据");
            let result = await reqBannerList();
            if(result.code == 200){
                context.commit('GETBANNERLIST',result.data);
            }
       
        },
        async getFloorList(context){
            let result = await reqFloorList();
            if(result.code == 200){
                context.commit('GETFLOORLIST',result.data)
            }
        }

    },
    mutations: {
        // 存储从服务器得到的categoryList，给state中的categoryList
        GETCATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList;
        },

        // 存储从服务器获到的bannerList
        GETBANNERLIST(state, bannerList){
            state.bannerList = bannerList;
            // console.log('在修改仓库中的bannerList数据');
        },
        GETFLOORLIST(state, floorList){
            state.floorList = floorList;
        }
    },
    state: {
        // 商品列表。因为result.data是一个数组，所以我们这里也写成一个空数组。这样是为了避免得不到数据，而我们又在代码中
        // 把categoryList当作数组操作，如果actegorylist如果不是数组就会报错
        categoryList: [],
        // home首页轮播图列表
        bannerList: [],
        floorList:[]

    },
    getters: {

    },
}