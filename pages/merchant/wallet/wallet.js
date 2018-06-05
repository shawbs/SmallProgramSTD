// pages/merchant/wallet/wallet.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: null,
    modelshow: false,
    orderMoney: {
      noPay: 0.00,
      noConsignment: 0.00,
      noReceiving: 0.00
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPage()
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
    this.initPage();
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000)
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

  //初始化
  initPage(){
    //获取商户帐户余额
    action.getMerchantBalance({}).then(res => {
      this.setData({
        money: res.data.amount
      })
    })

    this.merchantOrderMoney();
    
  },

  //商户帐户余额转入普通帐户钱包
  transferWallet(e){
    let formdata = e.detail.value;
    action.merchantTransfer({
      cashNum: formdata.cashNum*100
    }).then(res=>{
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
      this.setData({
        modelshow: false
      })
    })
  },

  showModel() {
    this.setData({
      modelshow: true
    })
  },

  hideModel(){
    this.setData({
      modelshow: false
    })
  },

  linkWithdraw(){
    app.globalData.payType = 2;
    wx.navigateTo({
      url: '/pages/merchant/withdraw/withdraw',
    })
  },

  //获取订单余款
  merchantOrderMoney(){
    action.merchantOrderMoney({}).then(res=>{
      let orderMoney = {};
      let merchantOrderInfoList = res.data.merchantOrderInfoList;
        if(merchantOrderInfoList.length> 0){
          for (let item of merchantOrderInfoList){
            if (item.orderStatus == 1){
              orderMoney.noPay = item.priceAmount;
            }
            if (item.orderStatus == 2){
              orderMoney.noConsignment = item.priceAmount;
            }
            if (item.orderStatus == 3) {
              orderMoney.noReceiving = item.priceAmount;
            }
          }
      }
      this.setData({
        orderMoney: orderMoney
      })
    })
  }
})