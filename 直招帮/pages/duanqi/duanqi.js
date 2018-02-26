// pages/duanqi/duanqi.js
var app = getApp();
var common = require('../../common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iszixun: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获得joblistcpt组件
    this.joblistcpt = this.selectComponent("#joblistcpt");
    console.log(this.selectComponent("#joblistcpt"));
    var that = this;
    if (options.id == 1) {
      //短期工
      var url = app.globalData.url + 'm=app&c=ClicDun&a=duanqigong';
      console.log(url);
      that.joblistcpt.xuanran1(url);
      // that.setData({
      //   iszixun: 1
      // })
    } else if (options.id == 2) {
      //假期工
      var url = app.globalData.url + 'm=app&c=ClicDun&a=jiaqigong';
      that.joblistcpt.xuanran1(url);
      that.setData({
        iszixun: 1
      })
    } else {
      //职场资讯和职场八卦没写，显示的是暂无数据
      that.setData({
        iszixun: 2
      })
    }

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
    // this.joblistcpt.meth()
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