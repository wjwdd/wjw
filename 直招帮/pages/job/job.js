// pages/job/job.js
var app = getApp();
var common = require('../../common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jid: 0,
    tabs: ["职位详情", "企业详情"],
    jobdetail: [],
    jobxinxi: {},
    jobtag: [],
    cid: 0,
    currentTab: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderwidth: 0,
    imgjoburl: app.globalData.imgurl,
    issc: true,//判断收藏,
    baijiazai: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    // 处理tab

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          zwidth: res.windowWidth,
          sliderLeft: 0,
          sliderOffset: res.windowWidth / 2 * that.data.currentTab,
          sliderwidth: res.windowWidth / 2,
          sliderHeight: res.windowHeight - 100
        });
      }
    });
    // 获取当前页的jid
    that.setData({
      jid: options.jid
    })
    app.get('m=App&c=index&a=compangprofil&jid=' + options.jid).then((res) => {
      var datatagarr = [];
      var datatag = res.data.data.tag_cn.split(',');
      var obj = that.Resoveto(res.data.data.contents);
      wx.setNavigationBarTitle({
        title: res.data.data.jobs_name
      })
      that.setData({
        jobdetail: res.data.data,
        jobxinxi: obj,
        jobtag: datatag,
        cid: res.data.data.cid
      })
      app.get('m=App&c=index&a=companyfile&cid=' + res.data.data.cid).then((res) => {
        that.setData({
          qydata: res.data,
          tag: common.chulitag(res.data.jobs),
        })
        wx.hideLoading();
      }).catch((errMsg) => {
        console.log(errMsg);//错误提示信息
        wx.hideLoading();
      });
      setTimeout(function () {
        wx.hideLoading()
        that.setData({
          baijiazai: false
        })

      }, 1000)
      wx.hideLoading();
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
    });

    //判断是否收藏
    var jid = options.jid;
    var uid = app.globalData.zzbuserinfo.uid;
    var data = {
      jid: jid,
      uid: uid
    }
    //调用 app.js里的 post()方法
    app.post('m=App&c=Xiaocx&a=checkfavor', data).then((res) => {
      if (res.data == 0) {
        that.setData({
          issc: true
        });
      } else {
        that.setData({
          issc: false
        });
      }
      wx.hideLoading();
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
    });



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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.jobdetail.jobs_name,
      path: '/pages/job/job?jid=' + this.data.jid,
      success: function (res) {
        // 转发成功

      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // job接口的基本信息只是一大段字符串需要前端自己解析一下基本信息等相关数据
  Resoveto: function (data) {
    var arry = [];
    var ay = new Array();
    var to = new Array();
    ay = data.split('【')
    for (var i = 0; i < ay.length; i++) {
      to = ay[i].split('】');

      var st = String(to[1]);


      var stin = st.replace(/\d、/g, '|');

      var xiangqing = stin.split('|');

      if (xiangqing.length > 1) {
        var au = [];
        for (var x = 1; x < xiangqing.length; x++) {
          var b = xiangqing[x];
          if (xiangqing[x] != undefined) {
            b = xiangqing[x].replace(/&nbsp;/g, '');
          }
          au.push(b);
        }
        var ob = {
          title: to[0],
          text: au,
          isbul: 1
        };
      } else {
        var a = '';
        if (to[1] != undefined) {
          a = to[1].replace(/&nbsp;/g, '');
        }
        var ob = {
          title: to[0],
          text: a,
          isbul: 2
        };
      }

      arry.push(ob);
    }

    arry.shift(0)
    if (arry.length) {
      return {
        key: 1,
        value: arry
      };
    } else {
      return {
        key: 2,
        value: data
      };
    }
  },
  // 地图
  maptap: function () {
    var that = this;
    wx.openLocation({
      latitude: parseFloat(that.data.jobdetail.map_y),
      longitude: parseFloat(that.data.jobdetail.map_x),
      scale: 28,
      address: that.data.jobdetail.address
    })
  },
  // 收藏点击事件
  shoucang: function () {
    if (app.globalData.zzbuserinfo.uid != undefined) {
      var that = this;
      var jid = that.data.jobdetail.jid;
      var uid = app.globalData.zzbuserinfo.uid;
      var data = {
        jid: jid,
        uid: uid
      }
      //调用 app.js里的 post()方法
      app.post('m=App&c=Xiaocx&a=resume_showcang ', data).then((res) => {
        if (res.data.staus == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
          that.setData({
            issc: !that.data.issc
          });
        } else {
          wx.showToast({
            title: '收藏失败',
            icon: 'none',
            duration: 1000
          })
        }
      }).catch((errMsg) => {
        console.log(errMsg);//错误提示信息
        wx.hideLoading();
      });
    } else {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  // 免费申请点击事件
  mfshenqing: function (e) {
    // console.log(app.globalData.zzbuserinfo.uid)
    // console.log(wx.getStorageSync('zzbuserinfo').isjianli)
    if (app.globalData.zzbuserinfo.uid != undefined && wx.getStorageSync('zzbuserinfo').isjianli == true) {
      var that = this;
      var jid = that.data.jobdetail.jid;
      var uid = app.globalData.zzbuserinfo.uid;
      var data = {
        jid: jid,
        uid: uid,
        formid: e.detail.formId
      }
      //调用 app.js里的 post()方法
      app.post('m=App&c=Xiaocx&a=resume_apply', data).then((res) => {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
        })
      }).catch((errMsg) => {

        console.log(errMsg);//错误提示信息
        wx.hideLoading();
      });
    } else if (wx.getStorageSync('zzbuserinfo').isjianli == false) {
      wx.navigateTo({
        url: '../jianli/jianli'
      })
    } else {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },

})