// pages/user/refund/refund.js
const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    previewList: [],
    orderNo:'',
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNo: options.orderNo || ''
    })
    this.init();
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

  init(){
    action.getRefundToken({
      orderNo: this.data.orderNo
    }).then(res=>{
        this.setData({
          token: res.data.returnToken,
          previewList: res.data.imgUrls || []
        })
    })
  },

  //上传拍品图片
  uploadImg() {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0]
        that.uploadImge(tempFilePath, 0)
      }
    })
  },

  //上传拍品图片和视频 type:0图片 1视频
  uploadImge(filePath, type) {

    action.uploadRefundImg({
      files: filePath,
      filename: 'file',
      formData: {
        returnToken: this.data.token,
      }
    }).then(res => {
      let previewList = this.data.previewList;
      previewList.push({
        imgUrl: res.data.url,
        id: res.data.id
      });
      this.setData({
        previewList: previewList
      })
    })
  },

  // 删除图片
  deleteImg(e){
    let id = e.target.dataset.id;
    let index = e.target.dataset.index;
    action.deleteRefundImg({
      returnToken: this.data.token,
      accessoryId: id
    }).then(res=>{
      let previewList = this.data.previewList;
      previewList.splice(index,1);
      this.setData({
        previewList: previewList
      })
    })
  },

  //提交退货
  postRefund(e){
    let parameter = e.detail.value;
    parameter = Object.assign(parameter,{
      orderNo: this.data.orderNo,
      returnToken: this.data.token
    });
    action.postRefund(parameter).then(res=>{
      if (res.data.isSuccess){
        wx.showToast({
          title: '提交成功',
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  }
})