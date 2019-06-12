//index.js
var config = require('../../config')

Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        } 
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
    // 用户登录示例
    login: function() {
      wx.cloud.callFunction({
        name: 'add',
        complete: res => {
          console.log('callFunction test result: ', res)
        }
      })

        if (this.data.logged) return
  
        // 调用登录接口
        wx.login({
          success(res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
                data: {
                  code: res.code
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
    },

   




})
