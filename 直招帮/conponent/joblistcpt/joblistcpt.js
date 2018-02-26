// conponent/joblistcpt/joblistcpt.js
// 小程序组件 https://www.jianshu.com/p/8a2a730d9e60
var app = getApp();
var common = require('../../common.js');
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    isweizhi:{
      type: Number,
      value:1
    }//判断右下角是否显示地区或者附近职位的千米数
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgjoburl: app.globalData.imgurl,
    joblist: [],
    // 当前页
    pageNumber: 1,
    // 总页数
    totalPage: 1,
    sizepage: 20,
    loading: true,
    nolist: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //由于接口不同，返回的值也不同，写了各种情况的渲染列表的方法，可优化成一个方法，还需整理
    //普通job列表
    xuanran(a){
      wx.showLoading({
        title: '加载中',
      })
      var that=this;
      wx.request({
        url: a,
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          
          if (res.data.staus==1){
            if (res.data.data.length!=0){
              that.setData({
                tag: common.chulitag(res.data.data),
                joblist: res.data.data,
                totalPage: Math.ceil(res.data.msg / that.data.sizepage)
              })
            }else{
              that.setData({
                joblist: '',
                nolist: false,
              })
            }
            
          }else{
            that.setData({
              nolist: false,
            })
          }
         
            wx.hideLoading()
         
        }
      })
    },
    //短期工job列表
    xuanran1(a) {
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      wx.request({
        url: a,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          
          if (res.data.length!=0){
            that.setData({
              tag: common.chulitag(res.data),
              joblist: res.data,
            })
          }else{
            that.setData({
              joblist: '',
              nolist: false,
            })
          }
          
          wx.hideLoading()
        }
      })
    },
    // post方法渲染job列表
    postxuanran(a,b) {
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      wx.request({
        url: a,
        data:b,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          
          if (res.data.staus==0){
            that.setData({
              nolist: false,
            })
          } else if (res.data.staus == 1){
            that.setData({
              tag: common.chulitag(res.data.data),
              joblist: res.data.data,
            })
           
          }
          wx.hideLoading()
        }
      })
    },
    //检验组件是否调用成功
    meth(){
      console.log('zujiansuccess')
    },
    // 下拉刷新渲染
    xialashuaxin(url){
      var that = this;
      var pageNumber = 1;
      that.setData({
        pageNumber: pageNumber,
      })
      wx.showNavigationBarLoading()
      wx.request({
        url: app.globalData.url + url +'&page='+ that.data.pageNumber,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            joblist: res.data.data,
            tag: common.chulitag(res.data.data),
            totalPage: Math.ceil(res.data.msg / that.data.sizepage)
          })

        }
      })
      setTimeout(function () {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }, 2000)
    },
    // 上拉加载渲染
    shanglajiazai(url){
      var that = this
      var pageNumber = that.data.pageNumber + 1;
      that.setData({
        pageNumber: pageNumber,
      })
      if (that.data.pageNumber <= that.data.totalPage) {
        that.setData({
          loading: false
        })
        wx.request({
          url: app.globalData.url + url + '&page=' +  pageNumber,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              joblist: that.data.joblist.concat(res.data.data),
              tag: that.data.tag.concat(common.chulitag(res.data.data)),
              loading: true,
              nolist: true,
            })

          }
        })
      } else {
        console.log(that.data.pageNumber)
        that.setData({
          loading: true,
          nolist: false,
          pageNumber: that.data.totalPage+1
        })
      }
    }
  }
})
