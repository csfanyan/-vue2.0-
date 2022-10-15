module.exports = {

  productionSourceMap:false,
  // 关闭ESLINT校验工具
  lintOnSave: false,
    devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // 真正请求资源的路径：
        // http://gmall-h5-api.atguigu.cn/api/product/getBase
				// pathRewrite:{'^/api':''}, //因为我们要得到数据的那一边，http://gmall-h5-api.atguigu.cn/api 需要有/api，所以就不需要重写路径了

      }
  }
}
};
