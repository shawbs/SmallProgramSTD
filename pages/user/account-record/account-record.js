// pages/user/account-record/account-record.js
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    type: '',
    moneyList: [],
    integralList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id || '',
      type: options.type || 'qb'
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
    if (this.data.type == 'jf'){
      this.initPage2()
    }else{
      this.initPage()
    }
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

  //帐户余额
  initPage() {

    action.getAccountMoneyList().then(res => {
      this.setData({
        moneyList: res.data.list
      })
    })

  },

  //积分
  initPage2() {

    action.getAccountIntegralList().then(res => {
      this.setData({
        integralList: res.data.list
      })
    })
  }
})