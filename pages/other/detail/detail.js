// pages/detail/detail.js
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exType: 2,
    auctionItemId: 106,
    swiper:{
      height: '240px'
    },
    tabIndex: 0,
    detail: null,
    pmgz:'',
    countTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      auctionItemId: options.id,
      exType: options.exType || 2
    })
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
    this.getDetail();
    this.getPMGZ();
    this.addLooker();
    this.getCountTime();
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
  //tab点击
  tabclick:function(e){
    var o = {}
    o[e.currentTarget.dataset.id] = 'active'
    this.setData({
      tabData: o
    })
  },
  //图片高度适应
  swiperAutoHeight: function(){
    wx.createSelectorQuery().select('#the-id').boundingClientRect(function (rect) {
      this.setData({
        swiper:{
          height: rect.width*(2/3)
        }
      })
    }).exec()
  },
  tab: function (e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },

  //获取详情
  getDetail(){
    let _this = this;
    action.getDetail({
      exType: this.data.exType,
      auctionItemId: _this.data.auctionItemId
    })
    .then(res=>{
      _this.setData({
        detail: res.data
      })
    })
    .catch(msg=>{
      console.log(msg)
    })
  },

  //加入围观
  addLooker(){
    action.addLooker({
      auctionItemId: this.data.auctionItemId
    }).then(res=>{

    })
  },

  //获取拍卖规则
  getPMGZ(){
    let _this = this;
    action.getPMGZ()
    .then(res=>{
      _this.setData({
        pmgz: res
      })
    })
    .catch()
  },

  //图片放大
  previewImage(e) {
    console.log(e)
    let target = e.target;
    let urls = this.data.detail.imgUrl;
    wx.previewImage({
      current: target.dataset.img,
      urls: urls,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //加价
  postPrice(price){
    
  },

  getCountTime(){
    let that = this;
    setInterval(function(){
      let countTime = util.getCountDown(that.data.detail.endTime);
      that.setData({
        countTime: countTime
      })
    },1000)
  },

  toggleGuanzhu(){
    let detail = this.data.detail;
    let remind = detail.remind;
    if(remind){
      detail.remind = false;
    }else{
      detail.remind = true;
    }
    this.setData({
      detail: detail
    })
    action.postGuanzhu({
      itemToken: this.data.detail.itemToken,
      isRemind: Number(!remind)
    }).then(res => { })
  },



})