// pages/kuaisu/kuaisu.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    index1: 0,
    index2: 0,
    sex:'男',
    date:'请选择您的出生日期',
    showTopTips: false,
    tip: '错误提示',
    tel:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(app.globalData.zzbuserinfo.tell);
    if (app.globalData.zzbuserinfo){
      that.setData({
        tel: app.globalData.zzbuserinfo.tell
      })
    }
    //调用 app.js里的 get()方法
    app.get('m=App&c=Tool&a=squidJoin').then((res) => {
      var category = ['(选填)'];
      var disdata = ['(选填)'];
      var wge = ['(选填)'];
      for (var i = 0; i < res.data.category.length; i++) {
        category.push(res.data.category[i].categoryname)
      }
      for (var i = 0; i < res.data.getDiqu[0].disdata.length; i++) {
        disdata.push(res.data.getDiqu[0].disdata[i].cnane)
      }
      for (var i = 0; i < res.data.wge.length; i++) {
        wge.push(res.data.wge[i].c_name)
      }
      that.setData({
        zhiweiarray: category,
        quyuarray: disdata,
        xinziarray: wge,
      })
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      
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
  radioChange:function(e){
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
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      zhiwei: this.data.zhiweiarray[e.detail.value]
    })
  },
  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value,
      quyu: this.data.quyuarray[e.detail.value]
    })
  },
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value,
      xinzi: this.data.xinziarray[e.detail.value]
    })
  },
  formSubmit:function(e){
    var that = this;
    if (e.detail.value.username.length == 0) {
      that.tiphide('联系人不能为空！')
      return false
    }
    if (e.detail.value.age.length == 0 || e.detail.value.age == '请选择您的出生日期') {
      that.tiphide('出生日期不能为空！')
      return false
    }
    if (e.detail.value.tel.length == 0) {
      that.tiphide('电话不能为空！')
      return false
    }
    var regularMobile = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/;
    if (!e.detail.value.tel.match(regularMobile)) {
      that.tiphide('手机号码格式有误');
      return;
    }
    var data = e.detail.value;
    //调用 app.js里的 post()方法
    app.post('m=App&c=index&a=squidJoin', data).then((res) => {//快速入职提交表单
      if (res.data.staus) {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,

        })
      } else {
        wx.showModal({
          title: '提示',
          content: '提交失败',
          showCancel: false,

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
      tip: '提示：' + a ,
      showTopTips: true
    })
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
})