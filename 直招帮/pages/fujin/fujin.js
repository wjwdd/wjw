// pages/fujin/fujin.js
var common = require('../../common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgjoburl: app.globalData.imgurl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获得joblistcpt组件
    this.joblistcpt = this.selectComponent("#joblistcpt");
    wx.showLoading({
      title: '寻找中',
    })
    var that=this;
    wx.getLocation({//获取坐标
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        //job列表
        var url = app.globalData.url + 'm=App&c=Index&a=nearbyJobApp&lat=' + latitude + '&lng=' + longitude//附近职位接口
        that.joblistcpt.xuanran(url);
      }
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
    this.joblistcpt.meth()
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
  
  }
})