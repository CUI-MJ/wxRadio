//index.js
//获取应用实例
const app = getApp()
var network = require('../../utils/network')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    isReg: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    if (this.data.isReg == 0) {
      wx.navigateTo({
        url: '../reg/reg'
      })
    }
    if (this.data.isReg == 1) {
      wx.switchTab({
        url: "/pages/course/course", // 如果本地缓存有信息证明登陆过
      })
    }

  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        if (wx.getStorageSync('userInfo') && (wx.getStorageSync('isReg') == 1) && wx.getStorageSync('token')) {
          wx.switchTab({
            url: "/pages/course/course", // 如果本地缓存有信息证明登陆过
          })
        } else {
          if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
            return wx.navigateTo({
              url: '../reg/reg'
            })
          }
          this.setData({
            hasUserInfo: false,
            canIUse: true,
          })
        }
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
  getLogin: function (e) {
    var that = this;
    let params = {
      code: app.globalData.code,
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl,
      city: e.detail.userInfo.city,
      province: e.detail.userInfo.province,
      country: e.detail.userInfo.country,
    }
    network.postRequest('/index.php?s=/api/train.user/login', params, res => {
      if (res.code == 1) {
        app.globalData.userInfo = e.detail.userInfo
        app.globalData.token = res.data.token;
        that.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true,
          isReg: res.data.is_reg
        })
        wx.setStorageSync('userInfo', e.detail.userInfo)
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('isReg', res.data.is_reg)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }, err => {
      wx.showToast({
        title: '网络错误请稍后再试',
        icon: 'none',
        duration: 2000
      })
    })

  }
})