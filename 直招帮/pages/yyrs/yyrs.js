// pages/yyrs/yyrs.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgjoburl: app.globalData.imgurl,
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //调用 app.js里的 post()方法
    var data =  {
        uid: app.globalData.zzbuserinfo.uid
      }
    app.post('m=app&c=tool&a=inviteuser', data).then((res) => {
      console.log(res.data)
      if (res.data.length != 0) {
        that.setData({
          yqlist: res.data
        })
      } else {
        that.setData({
          hidden: false
        })
      }
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

  }
})