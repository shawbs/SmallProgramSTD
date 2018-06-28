// pages/user/personal/personal.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
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



  //初始用户信息
  initPage() {
    //获取用户信息并更新到缓存和全局变量中
    action.getUserInfo().then(data => {
      let _data = { ...data.data };
      let user = wx.getStorageSync('__User');
      user = Object.assign(user, _data);
      wx.setStorageSync('__User', user);
      app.globalData.user = user;
      // _data.nickName = util.format(_data.nickName);
      this.setData({
        userInfo: _data
      })
    })
  },

  //修改性别
  setGender(){
    let list = ['男', '女'];
    let that = this;
    wx.showActionSheet({
      itemList: list,
      success: function (res) {
        let index = res.tapIndex;
        let userInfo = that.data.userInfo;
        userInfo.gender = index;
        that.setData({
          userInfo: userInfo
        })
        that.updataUserInfo({ gender: index})
      },
    })
  },

  //修改头像
  updataAvatar(){
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0]
        that.uploadImge(tempFilePath)
      }
    })
  },

  //上传头像
  uploadImge(filePath) {
    action.updataUserAvatar({
      files: filePath,
      filename: 'file',
      formData: {}
    }).then(res => {
      let userInfo = this.data.userInfo;
      userInfo.headImgUrl = res.data.headImgUrl;
      this.setData({
        userInfo: userInfo
      })
    })
  },

  //修改用户信息
  updataUserInfo(parameter){
    action.updataUserInfo(parameter).then(res=>{})
  },

  //修改昵称
  updateName(e){
    let value = e.detail.value;
    if (!value.length || value.length>8){
        this.setData({
          userInfo: this.data.userInfo
        })
        return;
    }
    let userInfo = this.data.userInfo;
    userInfo.nickName = value;
    this.setData({
      userInfo: userInfo
    })

    this.updataUserInfo({ nickName: value })
  }
})