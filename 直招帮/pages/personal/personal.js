// pages/jianli/jianli.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: '1',
    date: '请选择您的出生日期',
    showTopTips: false,
    tip: '错误提示',
    userInfo: {},
    hidden: true,
    select: false,
    liselect: [],
    flliselect: [],
    zwliselect: [],
    region: ['山东省', '青岛市', '黄岛区'],
    modalheight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '获取中',
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          modalheight: res.windowHeight - 200
        });
      }
    });
    // 渲染用户信息
    that.setData({
      fullname: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      tel: app.globalData.zzbuserinfo.tell
    })
    //调用 app.js里的 post()方法
    var data = {
      uid: app.globalData.zzbuserinfo.uid
    }
    app.getdata('m=App&c=Xiaocx&a=getUserInfo', data).then((res) => {//渲染获取用户信息接口
      var hope = ''
      if (res.data.hope != null) {
        hope = res.data.hope.hope1 + ',' + res.data.hope.hope2 + ',' + res.data.hope.hope3 + ',' + res.data.hope.hope4
      }
      var quyu = ''
      if (res.data.userinfo.address==null) {
        quyu =''
      } else if (res.data.userinfo.address.match(/,/)){
        quyu = res.data.userinfo.address.split(',')
      }else{
        quyu = res.data.userinfo.address.split(' ')
      }
      
      that.setData({
        year_value: res.data.userinfo.birthday,
        zhiweival: hope,
        region: quyu,
        jianliid: res.data.userinfo.id,
        sex: res.data.userinfo.sex,
        oldzhiwe: hope
      })
      wx.hideLoading()
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
    });

    // 渲染职位种类和福利
    //调用 app.js里的 post()方法
    app.get('m=App&c=TagToli&a=welfare').then((res) => {//渲染福利接口
      for (var i = 0; i < res.data.welfare.length; i++) {
        res.data.welfare[i].classselect = false;
      }
      that.setData({
        fuli: res.data.welfare
      })
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
    });

    app.get('m=App&c=TagToli&a=zhiwei').then((res) => {//渲染职位接口
      for (var i = 0; i < res.data.zhiwei.length; i++) {
        res.data.zhiwei[i].classselect = false;
      }
      that.setData({
        zhiwei: res.data.zhiwei
      })
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
      year_value: e.detail.value
    })
  },
  // 提交表单
  formSubmit: function (e) {
    wx.showLoading({
      title: '保存中',
    })
    var that = this;
    //提交简历
    var data = e.detail.value;
    data.uid = app.globalData.zzbuserinfo.uid;

    var datajob = {
      uid: app.globalData.zzbuserinfo.uid,
      hope: e.detail.value.hope
    }
    //调用 app.js里的 post()方法
    app.post('m=App&c=Xiaocx&a=setUserInfo', data).then((res) => {//修改简历
      if (res.data.staus == 1) {
        //调用 app.js里的 post()方法
        app.post('m=App&c=Xiaocx&a=sethope', datajob).then((res) => { //修改意向待遇
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
        }).catch((errMsg) => {
          console.log(errMsg);//错误提示信息
          wx.hideLoading();
        });

      } else if (res.data.staus == 0 && that.data.oldzhiwe != e.detail.value.hope) {
        //调用 app.js里的 post()方法
        app.post('m=App&c=Xiaocx&a=sethope', datajob).then((res) => {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
        }).catch((errMsg) => {
          console.log(errMsg);//错误提示信息
          wx.hideLoading();
        });
      } else {
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.hideLoading();
    });


    wx.request({
      url: app.globalData.url + 'm=App&c=Xiaocx&a=setUserInfo', //修改简历
      data: data,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值
      },
      success: function (res) {
        if (res.data.staus == 1) {
          wx.request({
            url: app.globalData.url + 'm=App&c=Xiaocx&a=sethope', //修改意向待遇
            data: datajob,
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded" // 默认值
            },
            success: function (res) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(function () {
                wx.hideLoading()
              }, 2000)
            }
          })
        } else if (res.data.staus == 0 && that.data.oldzhiwe != e.detail.value.hope) {
          wx.request({
            url: app.globalData.url + 'm=App&c=Xiaocx&a=sethope', //添加简历提交表单
            data: datajob,
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded" // 默认值
            },
            success: function (res) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(function () {
                wx.hideLoading()
              }, 2000)
            }
          })
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'none',
            duration: 2000
          })
        }


      }
    })
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
    this.setData({
      region: e.detail.value,
      quyu: e.detail.value[0] + ',' + e.detail.value[1] + ',' + e.detail.value[2]
    })
  }
})