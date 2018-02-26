// pages/zhaoppin/zhaopin.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["合作流程", "发布流程"],
    currentTab: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderwidth: 0,
    tip: '错误提示',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    var that = this;
    if (e.detail.value.name.length == 0) {
      that.tiphide('联系人不能为空！')
      return false
    }
    if (e.detail.value.phone.length == 0) {
      that.tiphide('手机号不能为空')
      return false
    }
    var regularMobile = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/;
    if (!e.detail.value.phone.match(regularMobile)) {
      that.tiphide('手机号码格式有误');
      return;
    }
    if (e.detail.value.company.length == 0) {
      that.tiphide('公司名称不能为空！')
      return false
    }
    if (e.detail.value.address.length == 0) {
      that.tiphide('公司地址不能为空！')
      return false
    }
    //调用 app.js里的 post()方法
    app.post('m=App&c=Tool&a=commpoy', e.detail.value).then((res) => {
      console.log(res.data);
      if (res.data.staus) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
    });
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