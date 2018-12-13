// pages/exam/exam.js
var checkValue = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkdata: [ 
      {
        title:'选择题选择题选择题选择题',
        items:[
          {name:'A',value:'中国'},
          {name:'B',value:'美国'},
          {name:'C',value:'中国'},
          {name:'D',value:'中国'},
        ]
      },
      {
        title:'撒娇撒打发沙发发',
        items:[
          {name:'A',value:'中国'},
          {name:'B',value:'美国'},
          {name:'C',value:'中国'},
          {name:'D',value:'中国'},
        ]
      },
      {
        title:'你说说读书卡闪电发货',
        items:[
          {name:'A',value:'中国'},
          {name:'B',value:'美国'},
          {name:'C',value:'中国'},
          {name:'D',value:'中国'},
        ]
      },
    ],
    // 绑定按钮是否可点
    clickCheck: true,
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'FRA', value: '法国' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 点击单选框
  checkboxChange: function (e) {
    checkValue = e.detail.value;
    // 判断是否选择了，如果选择了，才能点击按钮
    if (e.detail.value[0]) {
      this.setData({
        clickCheck: false
      })
    } else {
      this.setData({
        clickCheck: true
      })
    }
  },
  // 点击表单提交
  submit: function () {
    // 如果checkValue有值，说明选择了，可以提交
    if (checkValue[0]) {
      wx.showToast({
        title: '提交成功',
      })
    } else {
      wx.showToast({
        title: '未答题',
      })
    }
  }
})