//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

wx.cloud.init({
  env: 'tianzi-0nhcd'
})

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})