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
    platinum: 0 //白金人数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initScrollH();
    this.setData({
      windowH: wx.getSystemInfoSync().windowHeight
    })
    this.initPage(1);
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
      tabIndex: id
    })

    this.initPage(id);
  },

  //初始化数据
  initPage(type){
    this.getPartnerToken(partnerToken=>{

      if(type == 1){
        action.getInviteList({
          page: 1,
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

      if( type == 2){
        action.getInviteList2({
          page: 1,
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
  }
})