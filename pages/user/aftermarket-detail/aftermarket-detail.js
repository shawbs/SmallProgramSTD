// pages/user/aftermarket-detail.js
const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo: '',
    detail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        orderNo: options.orderNo || ''
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  
  initPage(){
    action.getAftermarketInfo(this.data.orderNo).then(res=>{
      let detail = res.data;
      detail.statusText = util.getAfterStatusText(detail.returnStatus)
      this.setData({
        detail: detail
      })
    })
  },

  previewImg(e){
    console.log(e)
    let dataset = e.target.dataset;
    wx.previewImage({
      current: dataset.img,
      urls: this.data.detail.acc,
    })
  }
})