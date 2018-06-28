// pages/user/setting/setting.js
const app = getApp();
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageSize: ''
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



  initPage(){
    var res = wx.getStorageInfoSync()
    this.setData({
      storageSize: (res.currentSize / 1024).toFixed(2)
    })
  },

  //退出登录
  signOut(){
    //清空全部缓存
    wx.clearStorageSync();
    wx.reLaunch({
      url: '../login/login',
    })
  },

  //清理缓存
  celarStorage(){
    util.celarStorage();
    this.initPage();
  }
})