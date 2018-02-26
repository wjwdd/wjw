// pages/jigong/jigong.js
var app = getApp();
var common = require('../../common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获得joblistcpt组件
    this.joblistcpt = this.selectComponent("#joblistcpt");
    var that=this;
    var url = app.globalData.url + 'm=App&c=IndeToNew&a=xcxlist&page=' + that.data.pageNumber;//技工专区接口
    that.joblistcpt.xuanran(url);
    
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
    var url = 'm=App&c=IndeToNew&a=xcxlist'
    this.joblistcpt.xialashuaxin(url);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var url = 'm=App&c=IndeToNew&a=xcxlist';
    this.joblistcpt.shanglajiazai(url);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})