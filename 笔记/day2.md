犯的错误:
1:项目阶段，左侧菜单目录，只能有项目文件夹
2:联想电脑安装node_modules依赖包的时候，经常丢包。npm install --save axios --force
3：单词错误



1.axios二次封装
AJAX:客户端可以'敲敲的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
XMLHttpRequest、$、fetch、axios
跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
JSONP、CROS、代理
2.1:工作的时候src目录下的API文件夹，一般关于axios二次封装的文件
2.2进度条：nprogress模块实现进度条功能
工作的时候，修改进度条的颜色，修改源码样式.bar类名的

在项目中经常用到api文件夹
axios就是放在api文件夹下



2.接口统一管理
项目很小：完全可以在组件的生命周期函数中发请求
项目大：axios.get('xxx')

在api的index.js下，管理接口


3.解决跨域问题
   



请求、响应拦截器----nprogress进度条
引入进度条：
import nprogress from 'nprogress';
引入进度条的样式
import 'nprogress/nprogress.css'

在请求开始时使用nprogress.start()
在请求结束时使用nprogress.done()
即可让请求数据时浏览器上面有进度条闪过的特效

如果想修改进度条的样式，去nprogress.css中修改即可

















