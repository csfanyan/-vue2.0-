import Vue from 'vue';
import Vuex from 'vuex';
// 应用插件
Vue.use(Vuex);

// 引入小仓库
import home from './home/index'
import search from './search/index'

// 对外暴露Store类的一个实例
export default new Vuex.Store({
    // 注册小仓库
    modules:{
        home,
        search
    }
    
});