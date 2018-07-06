// pages/user/recommend/recommend.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,

    scrollH: 0,
    windowH: 0,
    list: null,
    partnerToken: '',
    orderPrice:0,
    diamond:0, //钻石人数
    platinum: 0, //白金人数

    type: 1,
    page: 1,
    loadover: false,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initScrollH();
    this.setData({
      windowH: wx.getSystemInfoSync().windowHeight
    })
    this.initPage();
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



  initScrollH(){
    let $ = wx.createSelectorQuery();
    let _this = this;
    $.select('#topNav').boundingClientRect(function(rect){
      _this.setData({
        scrollH: rect.height
      })
    }).exec()
  },

  navtab(e){
    let target = e.target;
    let id = target.dataset.id;
    this.setData({
      tabIndex: id,
      type: id,
      loadover: false,
      page: 1,
      list: []
    })

    this.initPage();
  },

  //初始化数据
  initPage(){
    this.getPartnerToken(partnerToken=>{
      //一级会员数据
      if(this.data.type == 1){
        action.getInviteList({
          page: this.data.page,
          limit: 10,
          partnerToken: partnerToken
        }).then(res => {
          this.setData({
            list: res.data.entry,
            orderPrice: res.data.orderPrice,
            diamond: res.data.diamond,
            platinum: res.data.platinum
          })
        })
      }
      //二级会员数据
      if (this.data.type == 2){
        action.getInviteList2({
          page: this.data.page,
          limit: 10,
          partnerToken: partnerToken
        }).then(res => {
          this.setData({
            list: res.data.entry,
            orderPrice: res.data.orderPrice,
            diamond: res.data.diamond,
            platinum: res.data.platinum
          })
        })
      }
      
    })
    
  },

  //获取token
  getPartnerToken(cb){
    action.getPartnerToken().then(res=>{
      this.setData({
        partnerToken: res.data.partnerToken
      })
      cb(res.data.partnerToken)
    })
  },

  loadmore(){
    if(this.data.loadover || this.data.loading) return
    this.setData({
      loading: false
    })
    let page = ++this.data.page;
    if (this.data.type == 1) {
      action.getInviteList({
        page: page,
        limit: 10,
        partnerToken: this.data.partnerToken
      }).then(res => {
          if(page == res.page){
            this.setData({
              loadover: true
            })
          }else{
            this.setData({
              list: [...this.data.list, ...res.data.entry],
              orderPrice: res.data.orderPrice,
              diamond: res.data.diamond,
              platinum: res.data.platinum,
              page: page
            })
            this.setData({
              loading: false
            })
          }
      })
    }
    //二级会员数据
    if (this.data.type == 2) {
      action.getInviteList2({
        page: page,
        limit: 10,
        partnerToken: this.data.partnerToken
      }).then(res => {
        if (page == res.page) {
          this.setData({
            loadover: true
          })
        } else {
          this.setData({
            list: [...this.data.list, ...res.data.entry],
            orderPrice: res.data.orderPrice,
            diamond: res.data.diamond,
            platinum: res.data.platinum,
            page: page
          })
          this.setData({
            loading: false
          })
        }
      })
    }
  }
})