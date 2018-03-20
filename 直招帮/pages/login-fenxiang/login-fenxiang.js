// pages/login-fenxiang/login-fenxiang.js
// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yzm: '获取验证码',
    countdown: 60,
    isphone: false,
    isdl: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      yaoqingma: options.yaoqingma
    })
    if (app.globalData.code == '') {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          app.globalData.code = res.code
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
  //获取手机号
  getPhoneNumber: function (e) {
    wx.showLoading({
      title: '登录中',
    })
    var that = this;
    console.log(that.data.yaoqingma);
    wx.request({
      url: app.globalData.url + 'm=home&c=Xiaochengxu&a=shoujii',
      data: {
        code: app.globalData.code,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
        yaoqing: that.data.yaoqingma
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var sjdata = res.data;
        if (sjdata.code == 1) {
          wx.setStorageSync("zzbuserinfo", sjdata);
          app.globalData.zzbuserinfo = sjdata;
          if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '未授权',
              success: function (res) { }
            })
          } else {

            if (sjdata.state == 1) {
              console.log('yizhuce')
              wx.setStorageSync("islogin", true);
              wx.switchTab({
                url: '/pages/index/index'
              })
            } else if (sjdata.state == 0) {
              wx.redirectTo({
                url: '../jianli/jianli'
              })
            }


          }
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '登录失败',
            success: function (res) { }
          })
        }
      }
    })
    wx.hideLoading()

  },
  bindKeyInput1: function (e) {
    this.setData({
      phoneNumber_v: e.detail.value,
    })
  },
  bindKeyInput2: function (e) {
    console.log(e.detail.value);
    if (e.detail.value != undefined && e.detail.value != '') {
      this.setData({
        str_v: e.detail.value,
        isdl: false
      })
    } else {
      this.setData({
        str_v: e.detail.value,
        isdl: true
      })
    }
  },
  huoquyanzhengma: function () {
    var that = this;
    console.log(that.data.phoneNumber_v)
    if (that.data.phoneNumber_v == undefined) {
      that.tiphide('电话不能为空！')
      return false
    }
    var regularMobile = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/;
    if (!that.data.phoneNumber_v.match(regularMobile)) {
      that.tiphide('手机号码格式有误');
      return false;
    }
    wx.request({
      url: app.globalData.url + 'm=App&c=Mumber&a=buibuibui', //仅为示例，并非真实的接口地址
      data: {
        mobile: that.data.phoneNumber_v
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        var data = res.data
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
        if (data.msg == "短信发送成功") {
          that.settime()
          that.setData({
            yzm: that.data.countdown + '秒',
            isphone: true
          })
        }
      }
    })
  },
  putongdengl: function () {
    wx.showLoading({
      title: '登录中',
    })
    var that = this;
    console.log(that.data.phoneNumber_v)
    console.log(that.data.str_v)
    wx.request({
      url: app.globalData.url + 'm=App&c=Mumber&a=linshi ', //仅为示例，并非真实的接口地址
      data: {
        tell: that.data.phoneNumber_v,
        str: that.data.str_v
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var sjdata = res.data;
        if (sjdata.code == 1) {
          wx.setStorageSync("zzbuserinfo", sjdata);
          app.globalData.zzbuserinfo = sjdata;
          if (sjdata.state == 1) {
            console.log('yizhuce')
            wx.setStorageSync("islogin", true);
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else if (sjdata.state == 0) {
            wx.redirectTo({
              url: '../jianli/jianli'
            })
          }
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '登录失败',
            success: function (res) { }
          })
        }
        wx.hideLoading()
      },
      fail: function () {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  settime: function () {
    var that = this;
    if (that.data.countdown == 0) {
      that.setData({
        yzm: '获取验证码',
        countdown: 60,
        isphone: false
      })
      return false;
    } else {
      that.setData({
        yzm: that.data.countdown + '秒',
        countdown: that.data.countdown - 1
      })

    }
    setTimeout(function () {
      that.settime()
    }, 1000)
  },
  // 内容没填的弹出提示
  tiphide: function (a) {
    var that = this;
    this.setData({
      tip: '提示：' + a,
      showTopTips: true
    })
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
})