// pages/user/identification/identification.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    positiveImgUrl: '',
    reverseImgUrl: '',
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

  //上传
  uploadImg(e){
    let _type = e.currentTarget.dataset.type;
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0]
        that.uploadFile(tempFilePath, _type)
      }
    })
  },

  //上传身份证图片
  uploadFile(filePath, _type) {
    action.uploadIdentificationImg({
      files: filePath,
      filename: 'file',
      formData: {
        imgType: _type,
        certifyType: 0
      }
    }).then(res => {
      let imgurl = res.data.headImgUrl;
      if(_type == 1){
        this.setData({
          reverseImgUrl:imgurl
        })
      }else{
        this.setData({
          positiveImgUrl: imgurl
        })
      }
    })
  },

  //提交表单
  submitForm(e){
    let parameter = e.detail.value;
    parameter.positiveImgUrl = this.data.positiveImgUrl;
    parameter.reverseImgUrl = this.data.reverseImgUrl;
    parameter.purpose = 2;
    console.log(parameter)
    action.identificationPersonal(parameter).then(res=>{
      wx.showToast({
        title: '提交成功',
      })
    })
  }
})