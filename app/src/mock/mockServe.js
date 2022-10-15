// mockjs
// 作用一：mock.js生成随机数据
// mock.js支持各种数据的随机生成，官网也有具体的示例

// 作用二：模拟后端数据
// 可以使用mock.js模拟后端接口数据，通过随机数据,模拟各种场景。 开发无侵入 不需要修改既有代码,就可以拦截 Ajax 请求,返回模拟的响应数据。
// 点击apipost的Mock服务，在这里编辑自己接口需要返回的数据，点击保存复制mock，地址给前端就可以，模拟真实后端返回的响应数据了

// 注意：
// mockServe.js文件需要在入口文件引入(至少执行一次，才能模拟数据)。不执行这些代码的话，mork也就不能起作用，无法起到拦截作用

// 引入mockjs模块
// Mork是个对象，所以要大写
import Mock from 'mockjs';

// 将json数据引入进来
import banner from './banner.json';
import floor from './floor.json';

// mock数据：
// 第一个参数是请求地址(地址是不包括协议名+域名+端口号的)  第二个参数：请求数据
Mock.mock('/mock/banner',{code:200,data:banner}); //模拟首页大的轮播图的数据
Mock.mock('/mock/floor',{code:200,data:floor}); //


// console.log(555); //引入的时候会执行