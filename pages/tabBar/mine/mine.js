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
    // oldVersion: app.globalData.oldVersion
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    

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

  initPage(){
    this.setData({
      idCardNo: app.globalData.user ? app.globalData.user.idCardNo : ''
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

  linkMerchant(e){
    //获取认证状态，然后跳转不同页面
    action.getIdentificationStatus().then(res=>{
      let isexist = res.data.isexist;
      if(isexist){
        wx.navigateTo({
          url: '/pages/merchant/index/index',
        })
      }else{
        wx.navigateTo({
          url: '/pages/merchant/apply/apply',
        })
      }
    })
  },

})