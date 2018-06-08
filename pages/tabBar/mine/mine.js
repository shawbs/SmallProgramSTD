// pages/mine/mine.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    idCardNo: '',
    merchantApplyStatus: null,
    pass: false
    // oldVersion: app.globalData.oldVersion
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

  linkSetting(){
    wx.navigateTo({
      url: '../../user/setting/setting'
    })
  },

  linkPersonal(){
    wx.navigateTo({
      url: '../../user/personal/personal',
    })
  },

  //初始化
  initPage(){
    this.setData({
      idCardNo: app.globalData.user ? app.globalData.user.idCardNo : ''
    })
    //获取商户申请状态，如果通过则代表点击商户中心进入商户中心页，没有通过则跳转商户入驻入口页面
    this.getMerchantApplyStatus(()=>{
      let merchantApplyStatus = this.data.merchantApplyStatus;
      if (merchantApplyStatus.checkStatus == 2){
        this.setData({
          pass: true
        })
      }else{
        this.setData({
          pass: false
        })
      }
    })

    //获取用户信息并更新到缓存和全局变量中
    action.getUserInfo().then(data => {
      let _data = { ...data.data };
      let user = wx.getStorageSync('__User');
      user = Object.assign(user, _data);
      wx.setStorageSync('__User', user);
      app.globalData.user = user;
      _data.nickName = util.format(_data.nickName);
      this.setData({
        userInfo: _data
      })
    })
  },

  //点击商户中心跳转判断
  linkMerchant(e){
    if(this.data.pass){
      wx.navigateTo({
        url: '/pages/merchant/index/index',
      })
    }else{
      wx.navigateTo({
        url: `/pages/user/merchant-entry/merchant-entry`,
      })
    }
  },

  //获取商户申请状态
  getMerchantApplyStatus(cb) {
    action.getMerchantApplyStatus().then(res => {
      this.setData({
        merchantApplyStatus: res.data
      })
      wx.setStorageSync('merchantApplyStatus', res.data);
      cb && cb();
    })
  },

})