// pages/user/upgrade/upgrade.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    paymentNo: '',
    payNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('__User');
    console.log(userInfo)
    userInfo.userName = util.format(userInfo.userName,13)
    this.setData({
      userInfo: userInfo
    })
    this.initPage();
    app.globalData.payType = 3;
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
    //获取用户升级类型列表
    action.getTypeList().then(res => {
      if(res.data.list.length>0){
        this.setData({
          gradeId: res.data.list[0].gradeId,
          payNum: Number(res.data.list[0].upgradeFee / 100)
        })
      }
    })
  },

  //前往升级支付
  linkUpgradePost(){
    this.createPay(()=>{
      wx.navigateTo({
        url: `/pages/user/pay/pay?paymentNo=${this.data.paymentNo}`,
      })
    })
  },

  //生成支付订单
  createPay(cb) {
    action.createPay({
      typeId: this.data.gradeId
    }).then(res => {
      this.setData({
        paymentNo: res.data.paymentNo
      })
      cb && cb()
    })
  },

  
})