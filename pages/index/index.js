//index.js
//获取应用实例
const app = getApp()
var network  = require('../../utils/network')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../reg/reg'
    })
  },
  onLoad: function () {
    if (wx.getStorageSync('userInfo')) {
      wx.switchTab({
        url: "/pages/course/course", // 如果本地缓存有信息证明登陆过
      })
      // wx.redirectTo({
      //   url: 'page/home/home?user_id=111'
      // })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //获取授权信息
  getUserInfo: function (e) {
    var that = this;
    let params = {
      code:app.globalData.code,
      nickName:e.detail.userInfo.nickName,
      avatarUrl:e.detail.userInfo.avatarUrl,
      city:e.detail.userInfo.city,
      province:e.detail.userInfo.province,
      country:e.detail.userInfo.country,
    }
    network.postRequest('/index.php?s=/api/train.user/login',params,res=>{
      console.log(res)
      // app.globalData.userInfo = e.detail.userInfo
      // that.setData({
      //   userInfo: e.detail.userInfo,
      //   hasUserInfo: true
      // })
      // wx.setStorageSync('userInfo', e.detail.userInfo)
    },err=>{
      console.log(err)
    })
    
  }
})

