// pages/user/upgrade-post/upgrade-post.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xj: {//现金支付
      checked: true
    },
    yl: {//银联支付
      checked: false
    },
    wx: {//微信支付
      checked: false
    },
    xx: {//线下支付
      checked: false
    },
    typePay: null,//支付类型
    gradeId: 0,
    paymentNo: '',//订单号

    //提现-------------
    origin: '',
    originNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.origin){
      this.setData({
        origin: options.origin,
        originNum: options.originNum || 0,
        paymentNo: options.paymentNo || ''
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
    this.initPage();
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

  //初始页面
  initPage(){
    action.getTypeList().then(res=>{
      this.setData({
        typePay: res.data.list[0],
        gradeId: res.data.list[0].gradeId
      })
    })
  },
  togglePay(e){

  },
  //切换支付方式
  toggle(e){
    let name = e.currentTarget.dataset.name;
    if(name == 'xj'){
      let check = { checked: true}
      let check2 = { checked: false }
      this.setData({
        xj: check,
        yl: check2,
        wx: check2,
        xx: check2
      })
    }
    if (name == 'yl') {
      let check = { checked: true }
      let check2 = { checked: false }
      this.setData({
        xj: check2,
        yl: check,
        wx: check2,
        xx: check2
      })
    }
    if (name == 'wx') {
      let check = { checked: true }
      let check2 = { checked: false }
      this.setData({
        xj: check2,
        yl: check2,
        wx: check,
        xx: check2
      })
    }
    if (name == 'xx') {
      let check = { checked: true }
      let check2 = { checked: false }
      this.setData({
        xj: check2,
        yl: check2,
        wx: check2,
        xx: check
      })
    }
  },

  //支付处理
  postPay(e){
    //提现支付
    if(this.data.origin == 'tx'){
      this.drawPay();
      return
    }


    let that = this;
    //获取支付类型
    let payType = e.detail.value.payType;
    let paymentNo = that.data.paymentNo;
    //判断是否有订单号，避免重复生成订单
    if (!!paymentNo){
      that.getPayInfo(paymentNo, (data) => {
        console.log(data, that);
        that.switchPay(payType, data);
      })
    }else{
      that.createPay((_paymentNo) => {
        that.getPayInfo(_paymentNo, (data) => {
          console.log(data, that)
          that.switchPay(payType, data);
        })
      })
    }
    
  },

  //选择支付类型
  switchPay(payType,parameter){
    let paymentToken = '';
    switch (payType){
      case 'xj': 
                paymentToken = this.getPaymentToken(parameter.entrys, "pay_by_cash"); this.xjPay(paymentToken); 
                break;
      case 'yl': 
                this.ylPay(parameter); break;
      case 'wx': 
                paymentToken = this.getPaymentToken(parameter.entrys, "pay_by_cash"); this.wxPay({ paymentToken: paymentToken}); 
                break;
      case 'xx': 
                paymentToken = this.getPaymentToken(parameter.entrys, "pay_by_cash");
                this.xxPay(paymentToken); 
                break;
      default: console.log('payType参数有误')
    }
  },

  // 获取paymentToken entrys: array
  getPaymentToken(entrys, key){
    let paymentToken = '';
    if(Array.isArray(entrys)){
      for (let i of entrys){
        if (i.paymentType == key){
          paymentToken = i.paymentToken
        } 
      }
    }

    return paymentToken
  },
  //生成支付订单
  createPay(cb){
    action.createPay({
      typeId: this.data.gradeId
    }).then(res=>{
      this.setData({
        paymentNo: res.data.paymentNo
      })
      cb && cb(res.data.paymentNo)
    })
  },

  //获取支付项
  getPayInfo(paymentNo, cb){
    action.getPayInfo(paymentNo).then(res=>{
      cb && cb(res.data)
    })
  },

  //现金支付
  xjPay(paymentToken){
    action.xjPay(paymentToken).then(res=>{
      wx.showToast({
        title: '支付成功',
      })
    })
  },

  //银联支付
  ylPay(parameter) {
    parameter = {
      amount: this.data.typePay.upgradeFee,
      paymentNo: parameter.paymentNo
    }
    action.ylPay(parameter).then(res => {
      //银联支付链接
      let url = encodeURIComponent(res.data.url);
      wx.navigateTo({
        url: `/pages/user/pay-h5/pay-h5?url=${url}`,
      })
    })
  },

  //微信支付
  wxPay(parameter) {
    parameter = {
      paymentToken: parameter.paymentToken
    }
    action.wxPay(parameter).then(res => {
      //微信支付链接
      let url = encodeURIComponent(res.data);
      wx.navigateTo({
        url: `/pages/user/pay-h5/pay-h5?url=${url}`,
      })
    })
  },

  //线下支付
  xxPay(paymentToken) {
    wx.navigateTo({
      url: `/pages/user/pay-offline/pay-offline?paymentToken=${paymentToken}&payNo=${this.data.typePay.upgradeFee/100}`,
    })
  },

  //提现支付
  drawPay(){
    let that = this;
    let paymentNo = this.data.paymentNo;
    that.getPayInfo(paymentNo, (data) => {
      that.switchPay('xj', data);
    })
  }
})