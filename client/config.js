/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'localhost';
var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `http://${host}:5757/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `http://${host}:5757/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `http://${host}:5757/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `http://${host}:5757/weapp/upload`,

        tianziUrl: `http://${host}:5757/weapp/tianzi_http`,

    }
};

module.exports = config;
