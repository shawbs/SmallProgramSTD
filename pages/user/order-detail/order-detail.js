// pages/order-detail/order-detail.js
const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPage(options.id)
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

  initPage(orderNo){
    action.getOrderInfo({
      orderNo: orderNo
    }).then(res=>{
      let order = res.data;
      order.statusText = util.getStatusText(order.orderStatus)
      order.imgUrl = JSON.parse(order.imgUrl)
      this.setData({
        order: order
      })
    })
  },

  //收货
  postReceiving(e) {
    let orderno = e.currentTarget.dataset.orderno;
    action.postOrderReceived({
      orderNo: orderno
    }).then(res => {
      wx.showToast({
        title: '收货完成',
      })
    })
  },

  //前往支付
  linkPay(e) {
    let paymentno = e.currentTarget.dataset.paymentno;
    let token = e.currentTarget.dataset.token;
    let orderno = e.currentTarget.dataset.orderno;
    // console.log(e, paymentno, token, orderno)
    let isofflinepay = e.currentTarget.dataset.isofflinepay;//是否正在进行线下支付
    if (isofflinepay == true) {
      wx.showModal({
        title: '温馨提示',
        content: '您已经申请了线下支付渠道，是否更换其它支付方式？',
        success: function (res) {
          if (res.confirm) {
            let url = paymentno ? `/pages/user/pay/pay?paymentNo=${paymentno}` : `/pages/user/order-confirm/order-confirm?step=2&token=${token}&orderNo=${orderno} `;

            wx.navigateTo({
              url: url,
            })
          } else if (res.cancel) {
            return
          }
        }
      })
    } else {
      let url = paymentno ? `/pages/user/pay/pay?paymentNo=${paymentno}` : `/pages/user/order-confirm/order-confirm?step=2&token=${token}&orderNo=${orderno} `;

      wx.navigateTo({
        url: url,
      })
    }
  }
})