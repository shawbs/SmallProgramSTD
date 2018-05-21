// pages/live/live.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideInput: true,
    scrollH: '150px',
    hideModel: true,
    hideVideo: false,
    hideMask: true,
    rotate: '0deg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initScrollH();
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
  /**
   * 初始聊天器的高度
   */
  initScrollH: function(){
    let windowH = wx.getSystemInfoSync().screenHeight;
    let scrollH = 0;
    let self = this;
    wx.createSelectorQuery().select('.chat-wrapper').boundingClientRect(function (res) {
      scrollH = windowH - res.top - 124 + 'px'; 
      self.setData({
        scrollH: scrollH
      })
    }).exec()
    
  },

  //聊天框切换
  toggleMsg: function(){
    this.setData({
      hideInput: !this.data.hideInput
    })
  },

  //加一手
  addPriceAuto: function(){
    wx.showModal({
      title: '提示',
      content: '加价到1000元',
      showCancel: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //
  addPrice: function(){
    this.setData({
      hideModel: false
    })
  },

  //
  submitPrice: function(e){
    console.log(e)
  },

  //切换播放器
  toggleVideo: function(){
    this.setData({
      hideVideo: !this.data.hideVideo
    })
    if (this.data.hideVideo){
      this.setData({
        rotate: '180deg'
      })
    }else{
      this.setData({
        rotate: '0deg'
      })
    }
    //刷新聊天器的高度
    this.initScrollH();
  },

  //显示拍品信息
  showMask: function(){
    this.setData({
      hideMask: false,
      hideVideo: true
    })
  },

  //
  tapMask: function(e){
    if (e.target.id == 'auctionMask'){
      this.setData({
        hideMask: true,
        hideVideo: false,
        rotate: '0deg'
      })
    }
  }
})