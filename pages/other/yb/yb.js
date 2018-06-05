// pages/yb/yb.js
const app = getApp()

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: {
      height: '200px'
    },
    imgUrls: [
      'http://image.shuntd.cn/d12b414b-a00a-4553-a6b4-e4fc17183418.jpg',
      'http://image.shuntd.cn/0381dc5a-2440-4381-b876-a9b6cd775b83.jpg',
      'http://image.shuntd.cn/25cbdc87-6068-4ede-97e7-a47217b490f9.jpg'
    ],
    lottoList: [],
    lotto: null,
    recreationBalance: 0,
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //前往摇宝历史页
  toYbHistory: function(){
    wx.navigateTo({
      url: '/pages/other/yb-list/yb-list',
    })
  },

  //前往订单提交页
  toConfirm: function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/user/order-confirm/order-confirm?id=${id}&type=2`,
    })
  },

  //页面初始化
  initPage(){
    action.getLottoList({
      page: 1,
      limit: 10
    }).then(res=>{
      this.setData({
        lottoList: res.data.lottoItems,
        lotto: res.data.lottoItems[this.data.index],
        recreationBalance: res.data.recreationBalance
      })
    })
  },

  //图片预览
  previewImage(e) {
    console.log(e)
    let target = e.target;
    let urls = this.data.lotto.imgUrl;
    wx.previewImage({
      current: target.dataset.img,
      urls: urls,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //显示上一件摇宝
  prevLotto(){
    let lottoList = this.data.lottoList;
    let index = this.data.index;
    index = index > 0 ? --index : 0;
    this.setData({
      index: index,
      lotto: lottoList[index]
    })
  },

  //显示下一件摇宝
  nextLotto(){
    let lottoList = this.data.lottoList;
    let index = this.data.index;
    index = index < lottoList.length-1 ? ++index : (lottoList.length-1);
    this.setData({
      index: index,
      lotto: lottoList[index]
    })
  }
})