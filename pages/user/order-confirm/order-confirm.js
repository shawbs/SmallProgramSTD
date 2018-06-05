// pages/order-confirm/order-confirm.js
const app = getApp()

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmType: 1,  //1默认订单提交,2摇宝提交订单 
    lotto: null,
    defaultVal: 1,
    total: 0,
    info: null,
    address: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.setData({
      confirmType: options.type
    })
    if(options.type == 2){
      this.initPage(id)
    }else{
      this.initPage2(id)
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
    this.getDefaultAddress();
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

  //初始化摇宝订单
  initPage(lottoId){
    action.getLottoSure(lottoId).then(res=>{
      this.setData({
        lotto: res.data,
        total: this.data.defaultVal * res.data.price
      })
    })
  },

  //初始化商场换宝订单
  initPage2(id) {
    action.getStoreDetail({ treasureId: id}).then(res => {
      this.setData({
        info: res.data,
        total: this.data.defaultVal * res.data.price
      })
    })
  },

  //提交摇宝订单
  postLottoOrader: function(e){
    let id = e.target.dataset.id;
    action.postLottoOrader({
      price: this.data.total,
      buyNum: this.data.defaultVal,
      lottoId: id
    }).then(res=>{
      wx.navigateTo({
        url: `/pages/other/yb-pay/yb-pay?payNo=${res.data.paymentNo}`,
      })
    })
  },

  //提交商场换宝订单
  postStoreOrader(e){
    let dataset = e.target.dataset;
    action.storePaySure({
      addressToken: dataset.atoken,
      treasureItemToken: dataset.token,
    }).then(res => {
      wx.navigateTo({
        url: `/pages/other/yb-pay/yb-pay?payNo=${res.data.paymentNo}`,
      })
    })
  },

  //获取默认地址
  getDefaultAddress(){
    let address = wx.getStorageSync('selected_address');
    if (!address){
      action.getDefaultAddress().then(res=>{
        this.setData({
          address: res.data
        })
      })
    }else{
      this.setData({
        address: address
      })
    }
  },

  //输入数据绑定
  changNum(e){
    let value = e.detail.value;
    let lotto = this.data.lotto;
    if (value <= lotto.surplusNum){
      this.setData({
        defaultVal: value,
        total: value * this.data.lotto.price
      })
    } else {
      this.setData({
        defaultVal: lotto.surplusNum,
        total: lotto.surplusNum * this.data.lotto.price
      })
    }
    
  }
})