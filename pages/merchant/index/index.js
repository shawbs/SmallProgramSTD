// pages/merchant/index/index.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    amount: 0.00
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

  //初始用户信息
  initPage() {

    this.getMerchantToken(()=>{
      //获取商户信息
      action.merchantMainInfo().then(res => {
        this.setData({
          userInfo: res.data
        })
      })

      this.getMerchantBalance();
    })
  },

  //获取商户余额
  getMerchantBalance(){
    action.getMerchantBalance({}).then(res=>{
      this.setData({
        amount: res.data.amount/100
      })
    })
  },

  //更新商户token
  getMerchantToken(cb){
    action.merchantToken().then((res) => {
      wx.setStorageSync('__refreshMerchantToken', res.data.refreshMerchantToken)
      wx.setStorageSync('__merchantToken', res.data.merchantToken)
      console.log('已更新merchant_token和refresh_merchant_token')

      cb && cb();
    })
  }
})