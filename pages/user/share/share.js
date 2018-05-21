// pages/user/share/share.js

const QR = require('../../../utils/qrcode.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcode: {
      url: 'https://app.shuntd.cn/shuntd/login.html',
      w: 150,
      h: 150
    },
    previewImg:'',
    canvasHidden: false,
    inviterToken: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let inviterToken = wx.getStorageSync('__User').inviterToken;
    this.setData({
      inviterToken: inviterToken
    })
    let qrcode = this.data.qrcode;
    this.createQrCode(qrcode.url, "mycanvas", qrcode.w, qrcode.h)
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
  onShareAppMessage: function (res) {
    if(res.from === 'button'){
      let url = this.data.inviterToken ? `/pages/user/login/login?inviterToken=${this.data.inviterToken}` : '/page/user/login/login';
      return {
        title: '顺天达分享',
        path: url,
        success: function (res) {
          // 转发成功
          wx.showToast({
            title: '分享成功'
          })
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
  },

  createQrCode: function (url, canvasId, cavW, cavH) {
    let _this = this;
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH, function(url){
      _this.setData({
        previewImg: url,
        canvasHidden: true
      })
    })

  },


})