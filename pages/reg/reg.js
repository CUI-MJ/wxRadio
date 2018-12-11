var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt');
const app = getApp()

Page({
  data: {
    regs: {},
    hasPhoneNumber:false,
    canIUse: wx.canIUse('button.open-type.getPhoneNumber')
  },
  onLoad: function () {
      console.log('进入页面')
      console.log(app.globalData)
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }
})
