// pages/user/invoice/invoice.js
const app = getApp()

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
const ob = require('../../../utils/observer.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderToken:'',
    content: {
      1: true,//艺术品
      2: false,//珠宝
      3: false, //有疑问请联系客服400-000-0000
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderToken: decodeURIComponent(options.orderToken)
    })
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

  toggleExpress(e) {
    console.log(e)
    let value = e.detail.value;
    let types = this.data.content;
    for (let i in types) {
      types[i] = false;
    }
    types[value] = true;
    this.setData({
      content: types
    })
  },

  //创建订单发票
  postInvoice(e){
    let formdata = e.detail.value;
    formdata.content = this.getContent(formdata.content);
    action.createInvoice(
      Object.assign(formdata, 
      { 
        orderToken: this.data.orderToken
      })
    ).then(res=>{
      ob.emit('get_invoice', res.data);
      wx.navigateBack()
    })
  },


  getContent(key){
    let o = {
      1: '艺术品',
      2: '珠宝',
      3: '有疑问请联系客服400-000-0000'
    }
    return o[key]
  }
})