// pages/search/search.js
var WxSearch = require('wxSearch/wxSearch.js');
var common = require('../../common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgjoburl: app.globalData.imgurl,
    joblist: [],
    // 当前页
    pageNumber: 1,
    // 总页数
    totalPage: 1,
    sizepage: 20,
    loading: true,
    nolist: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    var that = this;
    var arr=[];
    //调用 app.js里的 post()方法
    app.get('m=App&c=index&a=hotword').then((res) => {//获取热门城市
      for (var i = 0; i < res.data.data.length; i++) {
        arr.push(res.data.data[i].w_word)
      }
      //初始化的时候渲染wxSearchdata
      WxSearch.init(that, 43, arr);
      WxSearch.initMindKeys(arr);
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
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
    
  },
  // 点击搜索事件
  wxSearchFn: function (e) {
    wx.showLoading({
      title: '搜索中',
    })
    var that = this;
    that.setData({
      pageNumber: 1,
    })
    var time = that.getNowFormatDate();
    WxSearch.wxSearchAddHisKey(that);
    //调用 app.js里的 getdata()方法
    var data={
      data: that.data.wxSearchData.value,
      page: that.data.pageNumber,
      time: time,
    }
    app.getdata('m=App&c=index&a=sssss', data).then((res) => {
      console.log(common.chulitag(res.data.data))
      if (res.data.staus == 2) {
        wx.hideLoading()
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
        that.setData({
          tag: common.chulitag(res.data.data),
          joblist: res.data.data,
          // totalPage: Math.ceil(res.data.msg / that.data.sizepage)
        })
      } else {
        wx.hideLoading()
        that.setData({
          joblist: res.data.data,
          tag: common.chulitag(res.data.data)
          // totalPage: Math.ceil(res.data.msg / that.data.sizepage)
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
    });
    
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    
    var that = this;
    that.setData({
      loading: false
    })
    var time = that.getNowFormatDate();
    var pageNumber = that.data.pageNumber + 1;
    that.setData({
      pageNumber: pageNumber,
    })
    //调用 app.js里的 getdata()方法
    var data = {
      data: that.data.wxSearchData.value,
      page: pageNumber,
      time: time,
    }
    app.getdata('m=App&c=index&a=sssss', data).then((res) => {
      if (res.data.staus == 1) {
        that.setData({
          joblist: that.data.joblist.concat(res.data.data),
          tag: that.data.tag.concat(common.chulitag(res.data.data)),
          loading: true,
          nolist: true,
        })
      } else {
        that.setData({
          loading: true,
          nolist: false,
          pageNumber: that.data.totalPage + 1
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
    });
  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  // wxSearchBlur: function (e) {
  //   var that = this
  //   WxSearch.wxSearchBlur(e, that);
  // },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  getNowFormatDate:function(){
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
      " " + date.getHours() + seperator2 + date.getMinutes() +
      seperator2 + date.getSeconds();
    return currentdate;
  }
})