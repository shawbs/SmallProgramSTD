// pages/other/identify/identify.js
const app = getApp()

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
// let uploading = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoData: {},
    previewList: [],
    appraisalToken: '',
    progress: {}
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
    action.getJB().then(res=>{
      let imgUrls = res.data.imgUrls;
      this.setData({
        previewList: res.data.imgUrls,
        infoData: res.data,
        appraisalToken: res.data.appraisalToken
      })
      if (res.data.paymentNo){
        wx.navigateTo({
          url: `/pages/other/yb-pay/yb-pay?payNo=${res.data.paymentNo}`,
        })
      }
    })
  },

  //打相册和相机
  selectImg(){
    let that = this;
    let previewList = that.data.previewList;
    wx.chooseImage({
      count: 6,
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        
        for (let file of tempFilePaths){
          that.uploadImge(file, (file) => {
            //上传完后删除空图片对象并加上上传好的图片对象
            file.imgUrl = file.url;
            delete file.url;
            previewList.push(file);
            that.setData({
              previewList: previewList
            })
          })
        }
        
      }
    })
  },

  //删除预览图片
  deleteImg(e){
    let target = e.currentTarget;
    let index = target.dataset.index;
    let id = target.dataset.id;
    action.deleteJBpic({
      appraisalToken: this.data.appraisalToken,
      accessoryId: id
    }).then(res=>{
      let previewList = this.data.previewList;
      previewList.splice(index, 1);
      this.setData({
        previewList: previewList
      })
    })
  },

  //上传鉴宝图片
  uploadImge(file,cb){
    action.uploadJBpic({
      files: file,
      filename: 'file',
      formData: { appraisalToken: this.data.appraisalToken}
    }).then(res=>{
      cb(res.data)
    })
  },

  //提交表单
  submitForm(e) {
    console.log(this.data.previewList.length)
    let formData = e.detail.value;
    formData.appraisalToken = this.data.appraisalToken;
    action.addJB(formData).then(res=>{
      wx.navigateTo({
        url: `/pages/other/yb-pay/yb-pay?payNo=${res.data.paymentNo}`,
      })
    })
  },

  //预览图片
  previewImg(e){
    let imgArr = [e.currentTarget.dataset.img]
    wx.previewImage({
      urls: imgArr,
    })
  },

  //拨打电话联系
  connectTel(){
    let arr = ['0592-5220601']
    wx.showActionSheet({
      itemList: arr,
      success: function (res) {
        wx.makePhoneCall({
          phoneNumber: arr[res.tapIndex]
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }

  
})