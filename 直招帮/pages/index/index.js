// pages/index/index.js
var app = getApp();
var common = require('../../common.js');
const CITY = require('../../wx-list-index/allcity_bak.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgjoburl: app.globalData.imgurl,
    imgUrls: [],
    city: '定位',
    indicatorDots: true,//轮播点
    indicatorActiveColor: '#26aa12',//轮播点的颜色
    autoplay: true,
    interval: 5000,
    duration: 500,
    loading: true,
    nolist: true,
    quanqi: '',//渲染短期资讯
    indexhidden: true
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    //获得joblistcpt组件
    this.joblistcpt = this.selectComponent("#joblistcpt");
    var that = this;
    //轮播图
    //调用 app.js里的 get()方法

    app.get('m=app&c=IndeToNew&a=getSiled').then((res) => {
      console.log(res.data);
      that.setData({
        imgUrls: res.data.data.siled
      })
      //短期工渲染
      app.get('m=app&c=Tool&a=apptype').then((res) => {
        that.setData({
          quanqi: res.data,
          indexhidden: false
        })
        // //job列表
        // var url = app.globalData.url + 'm=App&c=IndeToNew&a=Jollist&page=' + that.data.pageNumber + '&dist=' + that.data.city;
        // that.joblistcpt.xuanran(url);
      }).catch((errMsg) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 2000
        })
      });
    }).catch((errMsg) => {
      console.log(errMsg);
      wx.hideLoading();
    });
    //定位当前城市
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=cYW2kxi4AdD2Vc6gK8lcTEqouuGbdh0S&location=' + latitude + ',' + longitude + '&output=json',
          data: {},
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            // success  
            var dqcity = res.data.result.addressComponent.city;
            dqcity = dqcity.replace(/市/g, '')
            CITY[0].item[0].name = dqcity
            if (dqcity != wx.getStorageSync("city")) {
              wx.showModal({
                title: '提示',
                content: '是否切换当前城市',
                success: function (res) {
                  if (res.confirm) {
                    that.setData({
                      city: dqcity
                    })
                    wx.setStorageSync("city", dqcity);
                    var url = app.globalData.url + 'm=App&c=IndeToNew&a=Jollist&page=' + that.data.pageNumber + '&dist=' + that.data.city;
                    that.joblistcpt.xuanran(url);
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }


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
    if (wx.getStorageSync("city") != '') {
      this.setData({
        city: wx.getStorageSync("city")
      })
    }
    //job列表
    var url = app.globalData.url + 'm=App&c=IndeToNew&a=Jollist&page=' + this.data.pageNumber + '&dist=' + this.data.city;
    this.joblistcpt.xuanran(url);
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
    //job列表
    var url = 'm=App&c=IndeToNew&a=Jollist' + '&dist=' + this.data.city;;
    this.joblistcpt.xialashuaxin(url);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var url = 'm=App&c=IndeToNew&a=Jollist' + '&dist=' + this.data.city;
    this.joblistcpt.shanglajiazai(url);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  xuanzediqu: function () {
    // wx.showToast({
    //   title: '其他区域正在开通，敬请期待',
    //   icon: 'none'
    // })
    wx.navigateTo({
      url: '../citylist/citylist'
    })
  },
  lunbourl: function (e) {
    
    var isgot = e.currentTarget.dataset.isgot;
    var selfurl = e.currentTarget.dataset.selfurl;
    var jid = e.currentTarget.dataset.jid;
    console.log(selfurl)
    if (isgot == 1) {
      wx.navigateTo({
        url: '../job/job?jid=' + jid
      })
    } else if(isgot == 2) {
      wx.navigateTo({
        url: '../webview/webview?url=' + selfurl
      })
    } else if (isgot == 3) {
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
    }

  }
})