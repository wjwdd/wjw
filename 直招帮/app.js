//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that=this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: that.globalData.url +'m=home&c=Xiaochengxu&a=getopenid',
            method:'get',
            data: {
              code: res.code
            },
            success: function (res) {//返回取得的数据
              that.globalData.openid = res.data
            },
            error: function (e) {
              coonsole.log('网络出错');
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null,//微信用户信息
    url: 'https://www.zhizhaojob.cn/index.php?',//直招帮借口地址
    imgurl: 'https://www.zhizhaojob.cn/',//直招帮图片地址
    openid: '',
    zzbuserinfo: wx.getStorageSync("zzbuserinfo")//直招帮用户信息
  },
  /** 
    * 自定义post,get,getdata函数，返回Promise
    * @param {String}      url 接口网址
    * @param {arrayObject} data 要传的数组对象 like: {name: 'name', age: 32}
    * +-------------------
    * @return {Promise}    promise 返回promise供后续操作
    */
  post: function (url, data) {
    var promise = new Promise((resolve, reject) => {
      //init
      var that = this
      var postData = data;
      // postData.signature = that.makeSign(postData);
      //网络请求

      wx.request({
        url: that.globalData.url + url,
        data: postData,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {//返回取得的数据
          resolve(res);
        },
        error: function (e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  },
  getdata: function (url, data) {
    var promise = new Promise((resolve, reject) => {
      //init
      var that = this
      var postData = data;
      // postData.signature = that.makeSign(postData);
      //网络请求

      wx.request({
        url: that.globalData.url + url,
        data: postData,
        method: 'get',
        header: { 'content-type': 'application/json' },
        success: function (res) {//返回取得的数据
          resolve(res);
        },
        error: function (e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  },
  get: function (url) {
    var promise = new Promise((resolve, reject) => {
      var that = this

      //网络请求
      wx.request({
        url: that.globalData.url + url,
        method: 'get',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {//返回取得的数据

          resolve(res);


        },
        error: function (e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  },

})