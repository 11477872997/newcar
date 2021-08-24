module.exports = {
    devServer: {
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {//配置跨域
            '/api': {
                target: 'http://192.168.3.190:9001/vehicle_manager-1.0-SNAPSHOT/',//这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''//请求的时候使用这个api就可以
                }
            }

        }
    },
    publicPath:'/vehicle_manager-1.0-SNAPSHOT/',   //解决打包直接打开页面空白
}
