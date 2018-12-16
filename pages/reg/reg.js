var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt');
var network  = require('../../utils/network')
const app = getApp()

Page({
  data: {
    regs: {},
    hasPhoneNumber: false,
    canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
    compony:'',
    userName:'',
    telPhone:'',

  },
  onLoad: function () {
    console.log('进入页面')
    console.log(app.globalData)
  },
  getPhoneNumber(e) {
    var that = this;
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    let params = {
      encryptedData:e.detail.encryptedData,
      iv:e.detail.iv,
      sessionKey:app.globalData.sessionKey
    }
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) {
          that.setData({
            hasPhoneNumber:true,
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) {
          //拿到手机号
          network.postRequest('/index.php?s=/api/train.index/getIndexContent',params,res=>{
            console.log(res)
          },err=>{
            console.log(err)
          })
        }
      })
    }
  },
  submit() {
    if(this.data.compony == ''){
      wx.showModal({
        content: '请填写公司名称',
        showCancel: false,
      });
      return false; 
    }
    if(this.data.userName == ''){
      wx.showModal({
        content: '请填写姓名',
        showCancel: false,
      });
      return false; 
    }
    if(this.data.hasPhoneNumber == '' || !this.data.hasPhoneNumber){
      wx.showModal({
        content: '请授权手机号码或者填写手机号码',
        showCancel: false,
      });
      return false; 
    }
    if(this.checkPhone()){
      return false;
    }
    let params = {
      compony:this.data.compony,
      userName:this.data.userName,
      telPhone:this.data.telPhone
    }
    network.postRequest('/index.php?s=/api/train.index/getIndexContent',params,res=>{
      console.log()
      wx.switchTab({
        url: '/pages/course/course'
      });
    },err=>{
      console.log(err)
    })
    
  },
  bindKeyInput(e){
    this.setData({
      [e.target.dataset.name]: e.detail.value
    })
  },
 checkPhone(){ 
    var that = this;
    var phone = this.data.telPhone
    if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))){
        wx.showModal({
          content: '手机号码有误，请重填',
          showCancel: false,
          success: function (res) {
            that.setData({
              telPhone:''
            })
          }
        });
        return false; 
    } 
}
})
