// pages/job/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winheight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(parseFloat(options.lat))
    console.log(typeof options.lng)
    var lat = parseFloat(options.lat);
    var lng = parseFloat(options.lng);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winheight: res.windowHeight - 100,
          lat: lat,
          lng: lng,
          markers: [{
            iconPath: "/images/marker.png",
            id: 0,
            lat: lat,
            lng: lng,
            width: 50,
            height: 50
          }],
        });
      }
    });
    
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
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