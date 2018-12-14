// pages/courselists/courselists.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:'../../images/video01.png',
    checkicon:'../../images/video02.png',
    videLists:[
      {
        chapter:[
                {title:'《我国食品安全标准解读_解读》3_章节1',time:'10:00',id:1,issee:true,},
                {title:'《我国食品安全标准解读_解读》3_章节2',time:'10:00',id:2,issee:true,},
                {title:'《我国食品安全标准解读_解读》3_章节3',time:'10:00',id:3,issee:true,},
                {title:'《我国食品安全标准解读_解读》3_章节4',time:'10:00',id:4,issee:true,},
               ],
               courseId:1,
      },
      {
        chapter:[
                {title:'食品安全基础知识1_章节1',time:'10:00',id:5,issee:false,},
               ],
               courseId:2,
      },
      {
        chapter:[
                {title:'食品安全基础知识1_章节2',time:'10:00',id:6,issee:false,},
                {title:'食品安全基础知识1_章节3',time:'10:00',id:7,issee:false,},
               ],
               courseId:3,
      },
      {
        chapter:[
                {title:'食品安全基础知识1_章节4',time:'10:00',id:8,issee:false,},
               ],
               courseId:4,
      }
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
  //检测视频可不可以观看
  tapVideo(e){
    var msg = e.target.dataset.id
    var one = msg.split('-')[0];
    var two = msg.split('-')[1];
    var target = this.data.videLists[one].chapter[two];
    if(target.issee){
      console.log('视频已经看完')
    }
    else{
      if(one == 0&&two == 0){
        return console.log('视频可以观看')
      }
      if(two == 0){
        if(this.data.videLists[one-1].chapter[this.data.videLists[one-1].chapter.length-1].issee){
          console.log('视频可以观看')
        }else{
          console.log('有视频未看完')
        }
      }else{
        if(one == 0){
          if(this.data.videLists[one].chapter[two-1].issee){
            console.log('视频可以观看')
          }else{
            console.log('有视频未看完')
          }
        }
        else{
          if(this.data.videLists[one-1].chapter[two-1].issee){
            console.log('视频可以观看')
          }else{
            console.log('有视频未看完')
          }
        }
      }  
    }
  },
  //检测习题可不可以进入
  tabExercises(e){
    var number =  e.target.dataset.btnid;
    var targetChapter = this.data.videLists[number].chapter
    for(var k in targetChapter){
       if(!targetChapter[k].issee){
         console.log('有未看完的视频')
         return false; 
       }
    }
    console.log('可以进入测试');
    wx.navigateTo({
      url: "/pages/exam/exam?courseid=" + e.target.dataset.courseid
    })
  },
  tabExam(){
    for(var k in this.data.videLists){
      for(var j in this.data.videLists[k].chapter){
        if(!this.data.videLists[k].chapter[j].issee){
          console.log('有习题未完成')
          return false;
        }
        
      }
    }
  }
})