// 该模块，是对api进行统一管理

// 引入二次封装的axios
import requests from './request';
import mockRequest from './mockAjax';


// 流程：
// reqCategoryList、reqBannerList等是变量，存储着方法。只要执行变量()，就会执行方法，发送axios请求了
// 我们是在vuex仓库中发送的ajax请求，获取的数据

// 三级联动的接口
// 箭头函数是发请求
// axios发请求的结果返回结果是【Promise对象】
// 解读：因为requests是一个request，本质是一个axios，而且是经过包装的axios，所以rquests.get('')，就是经过包装的axios({config})，发送了一个get请求
// 而且get中是省略前缀的写法，省略了http://localhost:8080，直接写路径/api/product/getBaseCategoryList
// 然后再使用Promise.then，或者使用await，就能拿到Promise中成功的数据了
export const reqCategoryList = () => { return requests.get(`/product/getBaseCategoryList`) };


// 获取banner(home首页轮播图接口)
// 因为mockRequest配置对象中已经写好了baseURL='/mock'，这里就不用写/mock了。完整路径：'/mock/banner'
export const reqBannerList = () => { return mockRequest.get(`/banner`) };

//获取floor数据
export const reqFloorList = () => { return mockRequest.get(`/floor`) }



// 获取search接口
// 当前这个参数，需不需要接收外部传递的参数？ 需要
// 当前这个接口(获取搜索模块的数据)，给服务器传递一个默认参数(至少是一个空对象)
// 如果data是空对象，获得的就是全部数据。为啥呢……是接口里面就是这样写的吗，只要传来的是空，就返回全部数据？
export const reqGetSearchInfo = (params) => requests( { url: '/list', method: 'post', data:params})