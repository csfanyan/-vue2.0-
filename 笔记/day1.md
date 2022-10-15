1.要求
1.1：每一天老师书写代码务必三遍
1.2:node + webpack + VScode + 谷歌浏览器 + git
1.3:数组的方法 + promise + await + async + 模块化........

2.脚手架使用
2.1: vue init webpack 项目的名字
2.2|2.3：vue create 项目名称
脚手架目录:public + assets文件夹区别
node_modules:放置项目依赖的地方
public:一般放置一些共用的静态资源，打包上线的时候，public文件夹里面资源原封不动打包到dist文件夹里面
src：程序员源代码文件夹
  -----assets文件夹：经常放置一些静态资源（图片），assets文件夹里面资源webpack会进行打包为一个模块（js文件夹里面）
  -----components文件夹:一般放置非路由组件（或者项目共用的组件）
    App.vue 唯一的根组件
    main.js 入口文件【程序最先执行的文件】
    babel.config.js:babel配置文件
    package.json：看到项目描述、项目依赖、项目运行指令
    README.md:项目说明文件


3.脚手架下载下来的项目稍微配置一下
3.1:浏览器自动打开
    在package.json文件中
    "scripts": {
        "serve": "vue-cli-service serve --open",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
    },



3.2关闭eslint校验工具
创建vue.config.js文件：需要对外暴露
module.exports = {
   lintOnSave:false,
}

3.3 src文件夹的别名的设置
因为项目大的时候src（源代码文件夹）：里面目录会很多，找文件不方便，设置src文件夹的别名的好处，找文件会方便一些
创建jsconfig.json文件
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
}



1.完成非路由组件Header与Footer业务
在开发项目的时候：
1.书写静态页面(HTML+CSS)
2.拆分组件
3.获取服务器的数据动态展示
4.完成响应的动态业务逻辑

注意1：创建组件的时候，要找准组件结构和组件的样式，准备好图片资源
注意2：咱们项目采用的是less样式，但浏览器不识别less样式，需要通过less、less-loader进行处理less，把less样式变为css样式，浏览器才可以识别
注意3：如果想让组件识别less样式，需要在style标签上加上 lang='less'
注意4: 清除默认样式。把reset.css放在public文件夹下，然后在index.html中引入  <link rel="stylesheet" href="<%= BASE_URL %>reset.css">




2.路由的配置
vue-router
路由分为KV

node平台（并非语言）
对于后台而言:K即为URL地址   V即为相应的中间件
http://localhost:8080/0607
app.get("/0607",(res,req)=>{
   res.send('我是祖国的老花骨朵');
});


前端路由:
K即为URL（网络资源定位符）
V即为相应的路由组件


3.1路由的一个分析
确定项目结构顺序:上中下 -----只有中间部分的V在发生变化，中间部分应该使用的是路由组件
2个非路由组件|四个路由组件
两个非路由组件：Header 、Footer
路由组件:Home(首页)、Search(搜索)、Login（没有底部的Footer组件，带有二维码的）、Register（没有底部的Footer组件，带二维码的）

3.2安装路由
 cnpm install --save vue-router 
--save:可以让你安装的依赖，在package.json文件当中进行记录
3.3创建路由组件【一般放在views|pages文件夹】
3.4配置路由，配置完四个路由组件





1.Home模块拆分
1.1.先把静态页面完成
1.2.拆分出静态组件
1.3.获取服务器的数据进行展示
1.4.开发动态业务

拆分组件：结构+样式+图片资源
一共要拆分为七个组件

思想：
1.因为有多个地方用到了三级联动，所以可以把三级联动拆分成一个组件。并且这种公用的组件，可以放到component文件夹中
2.在写的时候，因为是把轮播图和尚品汇快报弄到一起的，所以这俩拆分成一个组件
3.今日推荐，拆成一个组件
4.热卖排行，拆成一个组件
5.猜你喜欢，拆成一个组件
6.家用电器、手机通讯两个内容结构相似，拆成一个组件
7.各大品牌的logo，拆成一个组件


2.三级联动组件完成
由于三级联动在Home、Search、Detail都要使用，所以要把三级联动注册为全局组件
好处：只需要注册一次，就可以在项目任意地方使用















     
    


4:项目上传GIT
微信小程序实战课的时候，会带着大家玩耍的
注意:前面基础课程当中，创建分支、处理冲突等等
https://gitee.com/jch1011/shangpinhui_0607.git


