// pages/user/wallet/wallet.js
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    navlist: [
      { cateId: 0, cateName: '我的帐户' },
      { cateId: 1, cateName: '我的积分' },
      // { cateId: '2', cateName: '艺术拍场' }
    ],
    money: null,
    moneylist:[],
    integral: null,
    integralList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tabIndex: options.tab || 0
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
    this.initPage()
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

  navtab(e){
    let id = e.detail.id;
    this.setData({
      tabIndex: id
    })
  },

  initPage(){
    //获取帐户余额
    action.getAccountMoney().then(res=>{
      this.setData({
        money: res.data
      })
    })
    //获取帐户流水记录
    action.getAccountMoneyList().then(res => {
      this.setData({
        moneyList: res.data.list
      })
    })
    //获取帐户积分
    action.getAccountIntegral().then(res => {
      this.setData({
        integral: res.data
      })
    })
    //获取帐户积分流水记录
    action.getAccountIntegralList().then(res => {
      this.setData({
        integralList: res.data.list
      })
    })
  }
})