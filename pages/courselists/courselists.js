// pages/courselists/courselists.js
var network  = require('../../utils/network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:'../../images/video01.png',
    checkicon:'../../images/video02.png',
    videLists:[ ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTrainDetail(options.id)
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
  //获取视频列表详情
  getTrainDetail(train_id){
    let that = this;
    let params = {
      train_id:1
    }
    network.postRequest('/index.php?s=/api/train.index/getTrainDetail',params,res=>{
      if(res.code == 1){
        that.setData({
          videLists:res.data.content,
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    },err=>{
      wx.showToast({
        title:'网络错误请稍后再试',
        icon: 'none',
        duration: 2000
      })
    })
  },
  //检测视频可不可以观看
  tapVideo(e){
    var that = this;
    var storage = wx.getStorageSync('answerList') 
    var msg = e.target.dataset.id;
    var hasVideo = false;
    if(msg == 0){
      hasVideo = true;
      return that.godetails(this.data.videLists[msg].video_url)
    }else{
      if(storage  == ''){
       return that.ShowModal('有视频未观看或习题未作答')
      }
      else{
        storage.some(element => {
          if(element.id == this.data.videLists[msg-1].question_id){
            hasVideo = true
            return that.godetails(this.data.videLists[msg].video_url)
          }
        });
        
      }
    }
    if(!hasVideo){
      that.ShowModal('有视频未观看或习题未作答')
    }
  },
  //检测习题可不可以进入
  tabExercises(e){
    var that = this;
    var storage = wx.getStorageSync('answerList') 
    var btnid = e.target.dataset.btnid
    var question_id = this.data.videLists[btnid].question_id;
    var hasExercises = false;
    if(btnid == 0){
      hasExercises = true;
      return that.goExam(question_id)
    }else{
      if(storage  == ''){
        that.ShowModal('有视频未观看或习题未作答')
      }
      else{
        console.log( this.data.videLists[btnid])
        storage.some(element => {
          if(element.id == this.data.videLists[btnid-1].question_id){
            hasExercises = true;
            return that.goExam(question_id)
          }
        });    
      }
    }
   if(!hasExercises){
     that.ShowModal('有视频未观看或习题未作答')
   }
  },
  tabExam(){
    var that = this;
    var storage = wx.getStorageSync('answerList') 
    var videLists = that.data.videLists;
    var totalExam = []
    if(storage  == ''){
      return that.ShowModal('有视频未观看或习题未作答')
    }
    else{
      storage.forEach(skey => {
        videLists.forEach(vkey => {
          if(skey.id == vkey.question_id){
            totalExam.push(vkey)
          }
        })
      })
      if(videLists.length == totalExam.length){
        console.log('可以去考试')
      }else{
        return that.ShowModal('有视频未观看或习题未作答')
      }
    }
   
  },
  ShowModal(content){
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: content,
    })
  },
  godetails(video_url){
    wx.navigateTo({
      url: "/pages/details/details?video_url=" + video_url
    })
  },
  goExam(question_id,answer){
    wx.navigateTo({
        url: "/pages/exam/exam?question_id=" + question_id + '&&answer=' + answer 
    })
  }
})