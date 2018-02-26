// pages/myjob/myjob.js
var app = getApp();
var common = require('../../common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我的收藏", "已申请职位"],
    currentTab: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获得joblistcpt组件
    this.shoucang = this.selectComponent("#shoucang");
    this.shenqing = this.selectComponent("#shenqing");
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.log(that.data.tabs.length);
        that.setData({
          zwidth: res.windowWidth,
          sliderLeft: 0,
          sliderOffset: res.windowWidth / 2 * that.data.currentTab,
          sliderWidth: res.windowWidth / 2,
          sliderHeight: res.windowHeight - 50
        });
      }
    });
    var urlsq = app.globalData.url + 'm=App&c=Xiaocx&a=applyjob';
    var urlsc = app.globalData.url + 'm=App&c=Xiaocx&a=favorite';
    var data={
      uid: app.globalData.zzbuserinfo.uid
    }
    that.shenqing.postxuanran(urlsq,data);
    that.shoucang.postxuanran(urlsc,data);
  },
  // tab点击事件
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      currentTab: e.currentTarget.id
    });

  },
  //手滑动触发事件
  tarbarchange: function (e) {
    this.setData({
      sliderOffset: this.data.zwidth / 2 * e.detail.current,
      currentTab: e.detail.current
    });
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
  
  }
})