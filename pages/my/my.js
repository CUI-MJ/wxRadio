var network  = require('../../utils/network')
const app = getApp()
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasPhoneNumber:false,
    canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
    userName:'张三',
    compony:'百度',
    listData:[
      {"code":"01","text":"text1","type":"type1"},
      {"code":"02","text":"text2","type":"type2"},
      {"code":"03","text":"text3","type":"type3"},
      {"code":"04","text":"text4","type":"type4"},
      {"code":"05","text":"text5","type":"type5"},
      {"code":"06","text":"text6","type":"type6"},
      {"code":"07","text":"text7","type":"type7"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 个人中心接口
    let params = {
      //应该从全局拿
      openid:'o_Qpd5YbrziQ6IfreLgypvxC7TDk'
    }
    network.postRequest('/index.php?s=/api/train.index/getMember',params,res=>{
      console.log(res)
    },err=>{
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      var userInfo = app.globalData.userInfo 
      that.setData({
        userInfo: userInfo
      })
      wx.hideLoading()
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindKeyInput(e) {
    this.setData({
      [e.target.dataset.name]: e.detail.value
    })
  },
})