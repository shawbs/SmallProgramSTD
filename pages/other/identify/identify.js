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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  initPage(){
    action.getJB().then(res=>{
      let imgUrls = res.data.imgUrls;
      this.setData({
        previewList: res.data.imgUrls,
        infoData: res.data,
        appraisalToken: res.data.appraisalToken
      })
    })
  },

  //打相册和相机
  selectImg(){
    let that = this;
    let previewList = that.data.previewList;
    // if (uploading){
    //   wx.showToast({
    //     title: '等待上传完成',
    //     icon: 'none'
    //   })
    //   return
    // }
    // uploading = true;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        //选完后设置一个空图片对象占用位置
        // previewList.push({
        //   imgUrl: '',
        //   id: ''
        // });
        // that.setData({
        //   previewList: previewList
        // })
        var tempFilePaths = res.tempFilePaths;
        // let uploadTask = 
        that.uploadImge(tempFilePaths[0], (file)=>{
          //上传完后删除空图片对象并加上上传好的图片对象
          previewList.pop();
          file.imgUrl = file.url;
          delete file.url;
          previewList.push(file);
          that.setData({
            previewList: previewList
          })
        });
        //获取上传进度
        // uploadTask.onProgressUpdate(res=>{
        //   let num = res.progress;
        //   //获取当前在上传的图片索引
        //   let key = previewList.length - 1;
        //   let progress = {};
        //   progress['index'] = key;
        //   progress['value'] = num
        //   that.setData({
        //     progress: progress
        //   })

        //   if (num == 100){
        //     setTimeout(function(){
        //       num = 101;
        //       progress['value'] = num;
        //       that.setData({
        //         progress: progress
        //       })
        //       uploading = false;
        //     },500)
        //   }
          
          
        // })
      },
      // fail(e){
      //   uploading = false;
      // }
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
  uploadImge(filePath,cb){
    action.uploadJBpic({
      files: filePath,
      filename: 'file',
      formData: { appraisalToken: this.data.appraisalToken}
    }).then(res=>{
      cb(res.data)
    })
  },

  //提交表单
  submitForm(e) {
    let formData = e.detail.value;
    console.log(formData);
    formData.appraisalToken = this.data.appraisalToken;
    action.addJB(formData).then(res=>{
      wx.showToast({
        title: '提交成功！',
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
    let arr = ['15810013266', '15811477498']
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