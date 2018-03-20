// pages/jianli/jianli.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: '1',
    date: '1990-01-01',
    showTopTips: false,
    tip: '错误提示',
    userInfo: {},
    hidden: true,
    select: false,
    flliselect: [],
    zwliselect: [],
    liselect: [],
    region: ['山东省', '青岛市', '黄岛区']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          modalheight: res.windowHeight - 200
        });
      }
    });
    //获取昵称和手机号
    if (app.globalData.userInfo != null) {
      that.setData({
        fullname: app.globalData.userInfo.nickName,
        tel: app.globalData.zzbuserinfo.tell
      })
    } else {
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo
          var nickName = userInfo.nickName
          that.setData({
            fullname: nickName,
            tel: app.globalData.zzbuserinfo.tell
          })
        }
      })
    }
    // 渲染职位种类和福利

    app.get('m=App&c=TagToli&a=welfare').then((res) => {//渲染福利接口
      for (var i = 0; i < res.data.welfare.length; i++) {
        res.data.welfare[i].classselect = false;
      }
      that.setData({
        fuli: res.data.welfare
      })
      wx.hideLoading();
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
    });
    app.get('m=App&c=TagToli&a=zhiwei').then((res) => {//渲染福利接口
      for (var i = 0; i < res.data.zhiwei.length; i++) {
        res.data.zhiwei[i].classselect = false;
      }
      that.setData({
        zhiwei: res.data.zhiwei
      })
      wx.hideLoading();
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
  // 选择性别改变时候触发的事件
  radioChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      sex: e.detail.value
    })
  },
  // 选择日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 提交表单
  formSubmit: function (e) {
    console.log(e.detail.value);
    var that = this;
    if (e.detail.value.birthdate.length == 0 || e.detail.value.birthdate == '请选择您的出生日期') {
      that.tiphide('请选择出生日期')
      return false
    }
    if (e.detail.value.telephone.length == 0) {
      that.tiphide('电话不能为空！')
      return false
    }
    var regularMobile = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/;
    if (!e.detail.value.telephone.match(regularMobile)) {
      that.tiphide('手机号码格式有误');
      return;
    }
    if (e.detail.value.hope.length == 0) {
      that.tiphide('请填写意向待遇！')
      return false
    }
    //提交简历
    var data = e.detail.value;
    data.uid = app.globalData.zzbuserinfo.uid;
    console.log(app.globalData.zzbuserinfo.uid)
    var datajob = {
      uid: app.globalData.zzbuserinfo.uid,
      hope: e.detail.value.hope
    }
    app.post('m=App&c=Xiaocx&a=editorPerfile', data).then((res) => { //添加简历提交表单
      console.log(res.data);
      if (res.data.staus == 1) {
        app.post('m=App&c=Tool&a=xcxhope', datajob).then((res) => {
          wx.showModal({
            title: '提示',
            content: '注册成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.setStorageSync("islogin", true); 
                var zzbuserinfo = wx.getStorageSync("zzbuserinfo")
                zzbuserinfo.isjianli = true;
                wx.setStorageSync("zzbuserinfo", zzbuserinfo)
                wx.switchTab({
                  url: '/pages/index/index'
                })
               
              }
            },
            fail: function () {
              wx.showToast({
                title: '网络请求失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
          wx.hideLoading();
        }).catch((errMsg) => {
          console.log(errMsg);//错误提示信息
          wx.hideLoading();
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '提交失败',
          showCancel: false,

        })
      }
      wx.hideLoading();
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
  // 待遇弹出框
  xzdaiyu: function () {
    this.setData({
      hidden: !this.data.hidden
    });
  },
  // 弹出框取消按钮
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  // 弹出框确认按钮
  confirm: function () {

    this.setData({
      hidden: true,
      zhiweival: this.data.flliselect.concat(this.data.zwliselect)
    });
    console.log(this.data.zhiweival)
    console.log(this.data.zwliselect)
  },
  // 弹出框里的选择福利事件
  xzfuli: function (e) {
    var that = this;
    var flliselect = that.data.flliselect;
    if (flliselect.length <= 2 || that.data.fuli[e.target.dataset.id].classselect) {
      console.log(e.target.dataset.id)

      var selectcalss = 'fuli[' + e.target.dataset.id + '].classselect'
      that.setData({
        [selectcalss]: !that.data.fuli[e.target.dataset.id].classselect
      });

      if (that.data.fuli[e.target.dataset.id].classselect) {
        flliselect.push(that.data.fuli[e.target.dataset.id].c_name);
      } else {
        for (var i = 0; i < flliselect.length; i++) {
          if (flliselect[i] == that.data.fuli[e.target.dataset.id].c_name) {
            flliselect.splice(i, 1);
          }
        }
      }

    } else {
      wx.showToast({
        title: '福利最多选三个',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 弹出框里的选择职位事件
  xzzhiwei: function (e) {
    console.log(e.target.dataset.id)
    var that = this;
    var zwliselect = that.data.zwliselect;
    if (zwliselect.length <= 0 || that.data.zhiwei[e.target.dataset.id].classselect) {
      var selectcalss1 = 'zhiwei[' + e.target.dataset.id + '].classselect'
      that.setData({
        [selectcalss1]: !that.data.zhiwei[e.target.dataset.id].classselect
      });
      if (that.data.zhiwei[e.target.dataset.id].classselect) {
        zwliselect.push(that.data.zhiwei[e.target.dataset.id].categoryname);
      } else {
        for (var i = 0; i < zwliselect.length; i++) {
          if (zwliselect[i] == that.data.zhiwei[e.target.dataset.id].categoryname) {
            zwliselect.splice(i, 1);
          }
        }
      }
    } else {
      wx.showToast({
        title: '职位最多选一个',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 选择地区
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})