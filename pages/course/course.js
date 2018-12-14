// pages/course/course.js
var page = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerUrl: '../../images/banner.jpg',
    scrollTop: 0,
    scrollHeight:0,
    isLoadmore:true,
    isNodata:false,
    totalPage:2,
    currentpage:1,
    list:[],
    lists:[
      { url: '../../images/banner.jpg', text: '1xxxxxx培训',time:'2018年12月2日' ,id:1},
      { url: '../../images/banner.jpg', text: '2xxxxxx培训',time:'2018年12月2日' ,id:2},
      { url: '../../images/banner.jpg', text: '3xxxxxx培训', time: '2018年12月2日'  ,id:3},
      { url: '../../images/banner.jpg', text: '5xxxxxx培训', time: '2018年12月2日'  ,id:4},
      { url: '../../images/banner.jpg', text: '6xxxxxx培训', time: '2018年12月2日'  ,id:5},
      { url: '../../images/banner.jpg', text: '7xxxxxx培训', time: '2018年12月2日'  ,id:6},
      { url: '../../images/banner.jpg', text: '8xxxxxx培训', time: '2018年12月2日'  ,id:7},
      { url: '../../images/banner.jpg', text: '9xxxxxx培训', time: '2018年12月2日'  ,id:8},
      { url: '../../images/banner.jpg', text: '0xxxxxx培训', time: '2018年12月2日'  ,id:9},
      { url: '../../images/banner.jpg', text: '-xxxxxx培训', time: '2018年12月2日'  ,id:10},
    ],
    listagin:[
      { url: '../../images/banner.jpg', text: '1xxxxxx培训',time:'2018年12月2日' ,id:1},
      { url: '../../images/banner.jpg', text: '2xxxxxx培训',time:'2018年12月2日' ,id:2},
      { url: '../../images/banner.jpg', text: '3xxxxxx培训', time: '2018年12月2日'  ,id:3},
      { url: '../../images/banner.jpg', text: '5xxxxxx培训', time: '2018年12月2日'  ,id:4},
      { url: '../../images/banner.jpg', text: '6xxxxxx培训', time: '2018年12月2日'  ,id:5},
      { url: '../../images/banner.jpg', text: '7xxxxxx培训', time: '2018年12月2日'  ,id:6},
      { url: '../../images/banner.jpg', text: '8xxxxxx培训', time: '2018年12月2日'  ,id:7},
      { url: '../../images/banner.jpg', text: '9xxxxxx培训', time: '2018年12月2日'  ,id:8},
      { url: '../../images/banner.jpg', text: '0xxxxxx培训', time: '2018年12月2日'  ,id:9},
      { url: '../../images/banner.jpg', text: '-xxxxxx培训', time: '2018年12月2日'  ,id:10},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getscrollHeight();
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
    console.log(1111111111111)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("lower");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindDownLoad: function (event) {
    var that = this;
    if(!(that.data.currentpage<that.data.totalPage)){
      that.setData({
        isLoadmore:false,
        isNodata:true,
      });
      console.log(that.data)
    }else{
      var number = that.data.currentpage+1;
      that.setData({
        currentpage:number,
        isLoadmore:true,
      });
      that.loadMore();
    }
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  topLoad: function (event) {
    console.log(event)
    var that = this;
    //该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    this.setData({
      lists: [],
      scrollTop: 0,
      currentpage:0,
    });
    that.loadMore('top');
    console.log("顶部");
  },
  loadMore:function(temp){
     var that = this
     if(temp == 'top'){
       var newdata = this.data.listagin;
     }else{
       var newdata = that.data.lists.concat(that.data.lists)
     }
     
     that.setData({
      lists:newdata,
      isLoadmore:false,
     });
  },
  getscrollHeight(){
    var that = this;
    //这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    wx.getSystemInfo({
      success:function(res) {
        that.setData({
              scrollHeight:res.windowHeight
        });
      }
    });
  },
  gopage:function(event){
    console.log(event)
  }
})