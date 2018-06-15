// pages/user/upgrade-post/upgrade-post.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')

/**
 * 支付流程 生成订单号=>获取订单号支付项=>支付
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payTypes: [
      {
        //现金支付
        type: 'xj',
        title: '现金支付',
        checked: true
      },
      {
        //银联支付
        type:'yl',
        title: '银联支付',
        checked: false
      },
      {
        //微信支付
        type: 'wx',
        title: '微信支付',
        checked: false
      },
      {
        //线下支付
        type: 'xx',
        title: '线下支付',
        checked: false
      },
    ],
    
    typePay: null,//支付类型
    gradeId: 0,
    paymentNo: '',//订单号

    payInfo: null, //支付项
    originType: 0, //来源类型
    originNum: 0, //支付数值
    paymentToken: '', //支付token
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      this.setData({
        paymentNo: options.paymentNo || '',
        originType: app.globalData.payType
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

  //初始页面
  initPage(){
    //获取帐户订单支付项
    action.getPayInfo(this.data.paymentNo).then(res => {
      //获取支持的支付类型
      let acceptedChannel = res.data.entrys[0].acceptedChannel;
      //获取支付token
      let paymentToken = res.data.entrys[0].paymentToken;
      //获取支付数值
      let payNum = res.data.entrys[0].amountToPay;
      let payTypes = [];

      for (let i=0;i< acceptedChannel.length;i++){
        //转换
        let type = this.getPayType1(acceptedChannel[i]);
        let checked = i==0?true:false;
        payTypes.push({
          type: type,
          title: this.getPayType3(type),
          checked: checked
        })
      }

      console.log(payTypes)

      this.setData({
        payTypes: payTypes,
        paymentToken: paymentToken,
        originNum: payNum
      })
    })

  },


  //切换支付方式
  toggle(e){

    let dataset = e.currentTarget.dataset;
    let name = dataset.name;
    let index = dataset.index;

    let payTypes = this.data.payTypes;
    for (let i=0;i<payTypes.length; i++){
      if(i == index){
        payTypes[i].checked = true;
      }else{
        payTypes[i].checked = false;
      }
    }
    
    this.setData({
      payTypes: payTypes
    })
  },

  //支付处理
  postPay(e){
    let type = e.detail.value.payType;

    this.switchPay(type)

  },

  //选择支付类型
  switchPay(payType){
    let paymentToken = this.data.paymentToken;
    switch (payType){
      case 'xj': this.xjPay(paymentToken); break;
      case 'yl': this.ylPay(); break;
      case 'wx': this.wxPay({ paymentToken: paymentToken}); break;
      case 'xx': this.xxPay(paymentToken); break;
      case 'merchant_account': this.merchantPay(paymentToken); break;
      default: console.log('payType参数有误')
    }
  },

  //现金支付
  xjPay(paymentToken){
    action.xjPay(paymentToken).then(res=>{
      wx.showToast({
        title: '支付成功',
      })
    })
    this.goback();
  },

  //银联支付
  ylPay() {
    let parameter = {
      amount: this.data.originNum,
      paymentNo: this.data.paymentNo
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
      url: `/pages/user/pay-offline/pay-offline?paymentToken=${paymentToken}&payNum=${this.data.originNum/100}`,
    })
  },

  //商户余额支付
  merchantPay(paymentToken){
    action.merchantPay({
      paymentToken: paymentToken
    }).then(res => {
      wx.showToast({
        title: '支付成功',
      })
    })
    this.goback();
  },

  //获取支持的支付类型
  getPayType1(key){
    let o = {
      'merchant_account': 'merchant_account',
      "account": 'xj',
      "fast_union_pay": 'yl',
      "wechat": 'wx',
      "offline_pay": 'xx',
    }
    return o[key]
  },

  //获取支付类型
  getPayType2(key) {
    let o = {
      "pay_by_cash": 'cash',
      "pay_by_recreation": 'recreation',
      "pay_by_point": 'point',
    }
    return o[key]
  },

  //获取支付类型
  getPayType3(key) {
    let o = {
      "xj": '现金支付',
      "yl": '银联支付',
      "wx": '微信支付',
      "xx": '线下支付',
      'merchant_account': '商户余额'
    }
    return o[key]
  },

  //支付成功判断路由到相应页面
  goback() {
    setTimeout(function () {
      let url;
      switch (app.globalData.payType) {
        case 0: url = '/pages/user/order/order'; break;
        case 1: url = '/pages/user/wallet/wallet'; break;
        case 2: url = '/pages/merchant/wallet/wallet'; break;
        case 3: url = '/pages/user/upgrade/upgrade'; break;
        default:
          wx.switchTab({
            url: '/pages/tabBar/index/index',
          });
      }
      wx.redirectTo({
        url: url,
      })

    }, 1000)
  }
})