// pages/other/new-detail/new-detail.js
const app = getApp()

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    type: 2, //1资讯 ， 2视频
    video: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: decodeURIComponent(options.url),
      type: options.type || 2
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



  initPage() {
    if (this.data.type == 2) {
      let videoInfo = app.globalData.videoInfo;
      this.setData({
        video: videoInfo
      })
      console.log(this.data.video)
    }
  },

  //点赞
  dopraise(e) {
    let target = e.target;
    //如果没有点赞过
    if (!target.dataset.praise) {
      action.dopraiseVideo({
        seminarId: target.dataset.id,
        deviceId: wx.getSystemInfoSync().model + new Date().getTime()
      }).then(res => {
        let video = this.data.video;
        video.praiseBefore = true;
        video.praise += 1;
        this.setData({
          video: video
        })
      })
    }

  },


})