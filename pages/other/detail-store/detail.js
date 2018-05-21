// pages/detail/detail.js
const action = require('../../../api/action.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    auctionItemId: 106,
    swiper:{
      height: '240px'
    },
    tabIndex: 0,
    detail: null,
    pmgz:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      auctionItemId: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDetail();
    this.getPMGZ();
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
  tabclick:function(e){
    var o = {}
    o[e.currentTarget.dataset.id] = 'active'
    this.setData({
      tabData: o
    })
  },
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
    action.getStoreDetail({
      treasureId: _this.data.auctionItemId
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
  previewImage(e){
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

  linkStoreComfirm(e){
    let target = e.target;
    wx.navigateTo({
      url: `/pages/user/order-confirm/order-confirm?id=${target.dataset.id}&type=1`,
    })
  }
  

})