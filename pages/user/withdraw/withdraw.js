// pages/user/withdraw/withdraw.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 0,
    drawNum: '',
    cardChecked: false,

    //选中卡号后
    bankCard: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.payType = 1;
    let bankCard = app.globalData.bankCard_default;
    if (bankCard){
      this.setData({
        bankCard: bankCard,
        cardChecked: true,
      })
    }
    this.initPage();
    let drawNum = app.globalData.drawNum;
    if (drawNum) {
      this.setData({
        drawNum: drawNum
      })
    }
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



  initPage(){
    if (app.globalData.payType == 1){
      this.getAccountMoney();
    }
    if (app.globalData.payType == 2) {
      this.getMerchantBalance();
    }
  },

  //获取用户帐户余额
  getAccountMoney(){
    action.getAccountMoney().then(res => {
      this.setData({
        money: res.data.balance || 0
      })
    })
  },

  //获取商户帐户余额
  getMerchantBalance() {
    action.getMerchantBalance().then(res => {
      this.setData({
        money: res.data.amount || 0
      })
    })
  },

  //写入全部余额
  selectMoney(){
    this.setData({
      drawNum: this.data.money/100
    })
  },

  //检验输入的金额
  setDrawNum(e){
    //如果输入金额小于总金额则允许,否则设置提现金额为总金额
    if (e.detail.value <= this.data.money){
      this.setData({
        drawNum: e.detail.value
      })
    }else{
      this.selectMoney();
      return this.data.money;
    }
  },

  //可在输入的提现金额
  saveDrawNum(){
    app.globalData.drawNum = this.data.drawNum;
  },

  //前往提现支付
  postWithDraw(){
    let drawNum = this.data.drawNum;
    let bankCardToken = this.data.bankCard.cardToken;
    if (Number(drawNum) && drawNum > 0){
        this.postDrawPay(drawNum, bankCardToken);  
    }else{
      wx.showToast({
        title: '请输入正确金额',
        icon: 'none'
      })
    }    
  },

  //用户提现
  postDrawPay(drawNum, bankCardToken){
    action.postDrawPay({
      cashNum: drawNum * 100,
      bankCardTokenString: bankCardToken
    }).then(res => {
      wx.navigateTo({
        url: `/pages/user/pay/pay?paymentNo=${res.data.paymentNo}`,
      })

    })
  }




})