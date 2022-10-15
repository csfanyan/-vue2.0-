import { reqGetSearchInfo } from "@/api"

// search模块
export default {
	namespaced: true,
	actions: {
		// 获取search模块数据
		// 因为发送post请求时，至少要保证data是一个空对象。所以params默认值是{}
		async getSearchList(context, params = {}) {
			let result = await reqGetSearchInfo(params);
			if (result.code == 200) {
				context.commit('GETSEARCHLIST',result.data);
			}
		}
	},
	mutations: {
		GETSEARCHLIST(state,searchList){
			state.searchList = searchList;
		}
	},
	state: {
		searchList : {},

	},
	// 计算属性
	// 在项目中，getter的主要作用，是简化仓库中的数据(简化数据而生)
	getters: {
		goodsList(state){
			// 因为goodsList可能是服务器返回的数据，也可能是undefined
			// 可能有一个问题：
			// 断网或者网络慢，search组件还没有获得服务器的数据，就在标签内遍历goodsList等数据了
			// v-for只能遍历数组或对象，或者在这里，如果获取不到数据，state.searchList.goodsList就是undefined
			// 但undefined显然是不行的，至少要返回一个空数组
			// state.searchList.goodsList||[]，如果第一个参数是undefined，转换为bool值是false，就会将第二个作为结果返回
			return state.searchList.goodsList||[];
		},
		trademarkList(state){
			return state.searchList.trademarkList||[];
		},
		attrsList(state){
			return state.searchList.attrsList||[];
		}
	},
}