//index.js
var config = require('../../config')
const app = getApp()
Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
  onLoad: function () {
    wx.cloud.callFunction({
      name: 'login',
           complete: res => {
        this.logged = true
        console.log(res.result[0])
        app.globalData.userInfo = res.result[0]  
             console.log(app.globalData.userInfo)
      }
    }) 
   
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo
              wx.cloud.callFunction({
                name: 'updateUser',
                data: {
                  user: app.globalData.userInfo,
                },
                complete: res => {
                        }
              })
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
    }
  
})
