// 该文件的作用，是对于axios进行二次封装

// 引入axios模块
import axios from 'axios';

// 引入进度条模块
import nprogress from 'nprogress';
// 如果要使用进度条，除了要引入进度条模块外，还要引入进度条的样式
// 只要引入从node上导入的模块的css文件，路径就按照这种方式填(那个傻逼也没讲为什么要通过这种方式引入！！！)
// 如果想更改进度条的样式，直接去nprogress.css中修改即可
import 'nprogress/nprogress.css'


// 1.利用axios对象的方法create，去创建一个axios实例
// 这个request，就是一个axios
const requests = axios.create({
    // 配置对象
    // 接口当中，路径都带有'/api'，所以要写在baseURL当中
    // 向mock请求数据后，会请求路径为'/mock/*'的数据，也就是mock文件夹下的某个json文件
    baseURL: "/mock",
    // 代表请求超时的时间
    timeout: 5000,

})



// 设置请求拦截器
requests.interceptors.request.use(function (config) {
    // console.log("请求拦截器，成功-1号");
    // 进度条开始动
    nprogress.start();
    return config;

}, function (error) {
    console.log("请求拦截器，失败-1号");
    return Promise.reject(error);
});

// 设置响应拦截器
requests.interceptors.response.use(function (response) {
    // console.log("响应拦截器，成功-1号");
    // 进度条结束
    nprogress.done();

    return response.data;

    // 可以在这里直接response.data，那么下面axios().then中的response，就是response.data了
    // response.data;
}, function (error) {
    console.log("响应拦截器，失败-1号");
    return Promise.reject(error);
});




// 对外暴露
export default requests;