var network = require('../../utils/network')
const app = getApp()

Page({
  data: {
    regs: {},
    hasPhoneNumber: false,
    canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
    company: '',
    userName: '',
    telPhone: '',
    isshowText:false

  },
  onLoad: function () {
    if(wx.getStorageSync('isReg') == 1){
      this.setData({
        isshowText: true
      })
    }
  },
  getPhoneNumber(e) {
    var that = this;
    let params = {
      encryptedData: e.detail.encryptedData ? e.detail.encryptedData : '',
      iv: e.detail.iv ? e.detail.iv : '',
      token: wx.getStorageSync('token'),
      appid: app.globalData.appid
    }
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) {
          that.setData({
            hasPhoneNumber: true,
          })
        }
      })
    } else {
      //拿到手机号
      network.postRequest('/index.php?s=api/train.user/encrypt', params, res => {
        if (res.code == 1) {
          that.setData({
            hasPhoneNumber: true,
            telPhone: res.data.phoneNumber
          })
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.msg,
          })
        }
      }, err => {
      })
    }
  },
  submit() {
    if (this.data.company == '') {
      wx.showModal({
        content: '请填写公司名称',
        showCancel: false,
      });
      return false;
    }
    if (this.data.userName == '') {
      wx.showModal({
        content: '请填写姓名',
        showCancel: false,
      });
      return false;
    }
    if (this.data.hasPhoneNumber == '' || !this.data.hasPhoneNumber) {
      wx.showModal({
        content: '请授权手机号码或者填写手机号码',
        showCancel: false,
      });
      return false;
    }
    if (this.checkPhone()) {
      return false;
    }
    let params = {
      company: this.data.company,
      userName: this.data.userName,
      telPhone: this.data.telPhone,
      token:wx.getStorageSync('token'),
      appid:app.globalData.appid
    }
    network.postRequest('/index.php?s=api/train.user/regInfo', params, res => {
      wx.setStorageSync('isReg',1)
      if(res.code == 1){
        wx.switchTab({
          url: '/pages/course/course'
        });
      }else{
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: res.msg,
        })
      }
    }, err => {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '网络错误，请稍后再试',
      })
    })

  },
  bindKeyInput(e) {
    this.setData({
      [e.target.dataset.name]: e.detail.value
    })
  },
  checkPhone() {
    var that = this;
    var phone = this.data.telPhone
    if (!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))) {
      wx.showModal({
        content: '手机号码有误，请重填',
        showCancel: false,
        success: function (res) {
          that.setData({
            telPhone: ''
          })
        }
      });
      return false;
    }
  }
})