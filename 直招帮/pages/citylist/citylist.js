//index.js
//获取应用实例
const app = getApp()
const CityIndexList = require('../../wx-list-index/wx-list-index.js')
const CITY = require('../../wx-list-index/allcity_bak.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    windowheight:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        
        that.setData({
          windowheight: res.windowHeight
        })
      }
    })
    if (CITY[0].item[0].name != wx.getStorageSync("city")){
      //定位当前城市
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          wx.request({
            url: 'https://api.map.baidu.com/geocoder/v2/?ak=6oYulEb5jr2KOvk6koHWjA3H3P6RC4zK&location=' + latitude + ',' + longitude + '&output=json',
            data: {},
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              // success  
              var dqcity = res.data.result.addressComponent.city;
              dqcity = dqcity.replace(/市/g, '')
              CITY[0].item[0].name = dqcity
            },
            fail: function () {
              // fail  
            },
            complete: function () {
              // complete  
            }
          })
        }
      })
    }
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady: function () {
    // 创建组件实例 
    let listindex = new CityIndexList(this);
    // 点击事件
    listindex.tap(function (e) {
      // console.log(e.target.dataset.city)
      wx.setStorageSync("city", e.target.dataset.city);
      wx.navigateBack();
    })

    

    
  }
})
