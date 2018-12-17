// pages/exam/exam.js
var checkValue = [];
var network = require('../../utils/network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkdata: [],
    countDownMinute: 0,
    countDownSecond: 0,
    current: '',
    isHasTime: false,
    newdata: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    if (options) {
      this.setData({
        current: options.question_id,
      });
      that.getQuestioin(options.question_id)
    }


    // //试卷接口
    // console.log('考试试卷')
    // network.postRequest('/index.php?s=/api/train.index/getExam',{},res=>{
    //   console.log(res)
    // },err=>{
    //   console.log(err)
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  // 习题接口
  getQuestioin(question_id) {
    var that = this;
    let params = {
      question_id: question_id
    }
    network.postRequest('/index.php?s=/api/train.index/getQuestioin', params, res => {
      var content = [res.data.content]
      var checkdata = [];
      if (res.code == 1) {
        content.forEach((item) => {
          var obj = {};
          obj.title = item.title;
          obj.id = item.id
          obj.items = [];
          for (var k of item.questionselect.split('&&')) {
            obj.items.push({
              name: k.split(':')[0],
              value: k.split(':')[1]
            })
          }
          checkdata.push(obj)
        })
        that.setData({
          checkdata: checkdata,
        });
        that.dataDisplay()

      }
    }, err => {
      console.log(err)
    })
  },
  // 点击表单提交
  submit: function () {
    var that = this;
    var storage = wx.getStorageSync('answerList')
    //先提交后台成功再存缓存
    if (storage && storage.length > 0) {
      storage.some((sKey,sNum)=>{
        that.data.newdata.forEach((nKey)=>{
          if(sKey.id == nKey.id){
            storage[sNum] = nKey
          }else{
            storage.push(nKey)
          }
        })
      })
      wx.setStorageSync('answerList', storage)
      //返回上一页
      wx.navigateBack({
        delta: 1
      })      
    } else {
      var answerList = [];
      for (var key of that.data.newdata) {
        answerList.push(key)
      }
      wx.setStorageSync('answerList', answerList)
      wx.navigateBack({
        delta: 1
      })   
    }
  },
  // 点击单选框
  radioChange(e) {
    var that = this;
    console.log(e.detail.value)
    var newdata = that.data.checkdata;
    var ID = e.detail.value.split(',')[0];
    var name = e.detail.value.split(',')[1];
    console.log(ID,name)
    that.data.checkdata.forEach((item, position) => {
      if (item.id == ID) {
        newdata[position].items.forEach((value) => {
          if (value.name == name) {
            value.checked = true;
          }else{
            value.checked = false;
          }
        })
      }
    })
    this.setData({
      newdata: newdata
    });
    console.log(that.data.newdata)
  },
  //倒计时
  CountDown(totalSecond) {
    var interval = setInterval(function () {
      // 秒数
      var second = totalSecond;
      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;
      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        this.submit();
        wx.showToast({
          title: '考试结束',
        });
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },
  //数据回显
  dataDisplay() {
    var that = this;
    var storage = wx.getStorageSync('answerList');
    var newcheckdatas = that.data.checkdata;
    storage.forEach((skey) => {
      newcheckdatas.forEach((nkey,nNum)=>{
        if(skey.id == nkey.id){
          newcheckdatas[nNum] = skey
        }
      })
    })
    that.setData({
      checkdata: newcheckdatas,
    });
  }
})