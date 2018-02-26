// pages/tuijian/tuijian.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    money: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(options.yaoqingma);
    console.log(app.globalData.zzbuserinfo.invitecode);
    if (options.xixi == 456) {//转发的页面自动跳转分享的登录页并带上邀请码
      wx.redirectTo({
        url: '/pages/login-fenxiang/login-fenxiang?yaoqingma=' + options.yaoqingma
      })
      wx.hideLoading()
    }
    if (app.globalData.zzbuserinfo.invitecode == undefined && options.xixi != 456) {//如果该用户没有邀请码，也不是转发的，那么说明该用户没有登录
      wx.redirectTo({
        url: '/pages/login/login'
      })
      wx.hideLoading()
    } else if (app.globalData.zzbuserinfo.uid != undefined && options.xixi != 456) {//如果登录了并且不是转发页渲染当前页面信息
      var that = this;
      app.post('m=app&c=Tool&a=invitenum', { uid: app.globalData.zzbuserinfo.uid }).then((res) => {
        console.log(res.data)
        if (res.data.money == null) {
          that.setData({
            count: res.data.num,
            money: 0
          })
        } else {
          that.setData({
            count: res.data.num,
            money: res.data.money
          })
        }
        wx.hideLoading()
        wx.hideLoading();
      }).catch((errMsg) => {
        console.log(errMsg);//错误提示信息
        wx.hideLoading();
      });
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(app.globalData.zzbuserinfo.invitecode)
    }
    return {
      title: '邀请入职',
      path: '/pages/tuijian/tuijian?yaoqingma=' + app.globalData.zzbuserinfo.invitecode + '&xixi=456',
      success: function (res) {
        // 转发成功
        console.log(12121);
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 跳转活动细则页面
  hdxz: function () {
    wx.navigateTo({
      url: '../yqhoudong/yqhoudong'
    })
  },
  // 跳转查看已邀人的信息
  yyrs: function () {
    wx.navigateTo({
      url: '../yyrs/yyrs'
    })
  }
})