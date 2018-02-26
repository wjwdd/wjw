// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: wx.getStorageSync("islogin"),
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
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
    this.setData({
      islogin: wx.getStorageSync("islogin")
    })
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
  onShareAppMessage: function (res) {
    
  },
  dengl:function(){
    wx.navigateTo({
      //目的页面地址
      url: '../login/login',
      success: function (res) { },
      
    })
  },
  // 打电话
  calltell:function(){
    wx.makePhoneCall({
      phoneNumber: '4008334588' 
    })
  },
  // 跳转我的工作
  myjobherf:function(){
    if (app.globalData.zzbuserinfo.uid!=undefined){
      wx.navigateTo({
        //目的页面地址
        url: "../myjob/myjob",
        success: function (res) { },

      })
    }else{
      wx.navigateTo({
        //目的页面地址
        url: '../login/login',
        success: function (res) { },

      })
    }
    
  },
  // 跳转签到抽检
  qiandao:function(){
    wx.showModal({
      title: '提示',
      content: '体验该功能请下载直招帮app',
      // confirmText:'前往下载',
      success: function (res) {
        if (res.confirm) {
          // wx.navigateTo({
          //   //目的页面地址
          //   url: '../webview/webview',
          //   success: function (res) { },

          // })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  // 设置
  setting:function(){
    wx.openSetting({
      success: (res) => {
        /*
         * res.authSetting = {
         *   "scope.userInfo": true,
         *   "scope.userLocation": true
         * }
         */
      }
    })
  }
})