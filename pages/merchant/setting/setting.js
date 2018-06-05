// pages/merchant/setting/setting.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    activeType: '',
    userInfo: null
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //初始用户信息
  initPage() {

    //获取商户信息
    action.merchantInfo().then(res => {
      this.setData({
        userInfo: res.data
      })
    })

  },

  //修改店铺LOGO
  changeLogo(){
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
    action.uploadMerchantLogo({
      files: filePath,
      filename: 'file',
      formData: {
        imgType:3
      }
    }).then(res => {
      let userInfo = this.data.userInfo;
      userInfo.headImg = res.data.url;
      this.setData({
        userInfo: userInfo
      })
    })
  },

  //修改信息
  updateMerchantInfo(e){
    let parameter = e.detail.value;
    action.updateMerchantInfo(parameter).then(res=>{
      let userInfo = this.data.userInfo;
      userInfo[this.data.activeType] = parameter[this.data.activeType];
      this.setData({
        edit: false,
        activeType: '',
        userInfo: userInfo
      })
    })
  },

  toedit(e){
    let type = e.currentTarget.dataset.type;
    this.setData({
      edit: true,
      activeType: type
    })
  },

  cannelEdit(){
    this.setData({
      edit: false,
      activeType: ''
    })
  }
})