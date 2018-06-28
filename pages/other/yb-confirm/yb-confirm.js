// pages/order-confirm/order-confirm.js
const app = getApp()

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lotto: null,
    defaultVal: 1,
    total: 0,
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id || ''
    })
    this.initPage()

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



  //初始化摇宝订单
  initPage() {
    action.getLottoSure(this.data.id).then(res => {
      this.setData({
        lotto: res.data,
        total: this.data.defaultVal * res.data.price
      })
    })
  },


  //提交摇宝订单
  postLottoOrader: function (e) {
    let id = e.target.dataset.id;
    action.postLottoOrader({
      price: this.data.total,
      buyNum: this.data.defaultVal,
      lottoId: id
    }).then(res => {
      wx.navigateTo({
        url: `/pages/other/yb-pay/yb-pay?payNo=${res.data.paymentNo}`,
      })
    })
  },

  //输入数据绑定
  changNum(e) {
    let value = e.detail.value;
    let lotto = this.data.lotto;
    if (value <= lotto.surplusNum) {
      this.setData({
        defaultVal: value,
        total: value * this.data.lotto.price
      })
    } else {
      this.setData({
        defaultVal: lotto.surplusNum,
        total: lotto.surplusNum * this.data.lotto.price
      })
    }

  }
})