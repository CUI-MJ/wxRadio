// pages/exam/exam.js
var checkValue = [{ id: "1", value: "A" }];
var network  = require('../../utils/network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkdata: [
      {
        checkid: 1,
        title: '选择题选择题选择题选择题',
        items: [
          { name: 'A', value: '中国' },
          { name: 'B', value: '美国' },
          { name: 'C', value: '中国' },
          { name: 'D', value: '中国' },
        ]
      },
      {
        checkid: 2,
        title: '撒娇撒打发沙发发',
        items: [
          { name: 'A', value: '中国' },
          { name: 'B', value: '美国' },
          { name: 'C', value: '中国' },
          { name: 'D', value: '中国' },
        ]
      },
      {
        checkid: 3,
        title: '你说说读书卡闪电发货',
        items: [
          { name: 'A', value: '中国' },
          { name: 'B', value: '美国' },
          { name: 'C', value: '中国' },
          { name: 'D', value: '中国' },
        ]
      },
    ],
    countDownMinute:0,
    countDownSecond:0,
    current:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      current:options.courseid
    });
    this.CountDown(15*60);
    this.dataDisplay();
    // 习题接口
    let params = {
      question_id:1
    }
    network.postRequest('/index.php?s=/api/train.index/getQuestioin',params,res=>{
      console.log(res)
    },err=>{
      console.log(err)
    })
    //试卷接口
    console.log('考试试卷')
    network.postRequest('/index.php?s=/api/train.index/getExam',{},res=>{
      console.log(res)
    },err=>{
      console.log(err)
    })
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
  // 点击表单提交
  submit: function () {
    var that = this;
    var storage = wx.getStorageSync('answerList')
    var answerList = [];
    var obj = {
      id:this.data.current,
      answer:checkValue,
    }
    if(storage !== ''){
      storage.forEach((key,i)=>{
        if(key.id == that.data.current){
          storage.splice(i,1,obj)
        }
      })
      wx.setStorageSync('answerList',storage)
    }else{
      answerList.push(obj)
      wx.setStorageSync('answerList',answerList)
    }
  },
  // 点击单选框
  radioChange(e) {
    var ID = e.detail.value.split(',')[0];
    var value = e.detail.value.split(',')[1];
    var result = checkValue.some(item => {
      if (item.id == ID) {
        return true
      }
    })
    if (result) {
      checkValue.forEach(item => {
        if (item.id == ID) { // 对象里的唯一标识id
          return item.value = value
        }
      })
    } else {
      checkValue.push({ id: ID, value: value })
    }
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
  dataDisplay(){
     var that = this;
     var storage = wx.getStorageSync('answerList');
     var newcheckdatas =  that.data.checkdata;
     storage.forEach((key,i)=>{
      if(key.id == that.data.current){
        key.answer.forEach((item)=>{
          that.data.checkdata.forEach((datas,i)=>{
              if(item.id == datas.checkid){
                  datas.items.forEach((check,j)=>{
                    if(check.name == item.value){
                      newcheckdatas[i].items[j].checked = true;
                    }
                  })
              }
          })
        })
      }
    })
    that.setData({
      checkdata: newcheckdatas,
    });
  }
})