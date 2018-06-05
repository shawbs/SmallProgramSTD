// pages/merchant/push/push.js
const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endTime: util.formatYear(),
    time: util.getTimer(),
    time2: util.getTimer(),
    startTime: util.formatYear(),
    productTokenString: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      productTokenString: decodeURIComponent(options.token) ||''
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

  //发布拍品
  pushAuction(e) {
    let formdata = e.detail.value;
    formdata.startPrice = formdata.startPrice * 100; 
    formdata.addPrice = formdata.addPrice * 100;

    formdata.endTime = new Date(formdata.endTime + ' ' + formdata.time).getTime();
    formdata.startTime = new Date(formdata.startTime + ' '+ formdata.time2).getTime();
    let parameter = Object.assign(formdata, {
      merchantProductToken: this.data.productTokenString
    })
    action.pushMerchantAuction(parameter).then(res=>{
      wx.showToast({
        title: '发布成功！',
      })
      wx.redirectTo({
        url: '/pages/merchant/auction/auction'
      })
    })
  },

  bindDateChange1(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  bindDateChange2(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindTimeChange1(e) {
    this.setData({
      time: e.detail.value
    })
  },

  bindTimeChange2(e) {
    this.setData({
      time2: e.detail.value
    })
  },


})