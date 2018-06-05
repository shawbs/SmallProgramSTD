// pages/user/pay-offline/pay-offline.js
const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymentToken: '',
    tabIndex: 0,
    navlist: [
      {
        cateName: '对公帐户',
        cateId: 0
      },
      {
        cateName: '对私帐户',
        cateId: 1
      }
    ],
    previewList: [],
    payType: 0,
    privateAccount: null,
    publicAccount: null,
    file: null,
    payNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      paymentToken: options.paymentToken,
      payNum: options.payNum || 0
    })
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

  //线下支付
  xxPay(parameter) {
    action.xxPay(parameter).then(res => {

    })
  },

  navtab(e){
    console.log(e)
    let id = e.detail.id;
    this.setData({
      payType: id
    })
  },

  //打相册和相机
  selectImg() {
    let that = this;
    let previewList = that.data.previewList;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0]
        //选完后设置一个空图片对象占用位置
        previewList.push({
          imgUrl: tempFilePath,
          id: ''
        });
        that.setData({
          previewList: previewList,
          file: tempFilePath
        }) 
      },
      fail(e) {
      }
    })
  },

  //上传线下支付凭证图片和其它数据
  uploadImge(filePath) {
    return action.xxPay({
      files: filePath,
      filename: 'file',
      formData: { 
        paymentToken: this.data.paymentToken,
        payObject: this.data.payType
      }
    }, (res) => {
      wx.showToast({
        title: '提交成功',
      })
    })
  },

  //提交表单
  submitForm(e) {
    console.log(e)
    let that = this;
    let previewList = that.data.previewList;
    let uploadTask = that.uploadImge(this.data.file);
  },

  //预览图片
  previewImg(e) {
    let imgArr = [e.currentTarget.dataset.img]
    wx.previewImage({
      urls: imgArr,
    })
  },

  initPage(){
    action.getOfflinePay().then(res=>{
      this.setData({
        privateAccount: res.data.privateAccount,
        publicAccount: res.data.publicAccount
      })
    })
  }
})