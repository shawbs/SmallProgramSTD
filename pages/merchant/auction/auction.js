// pages/merchant/auction/auction.js

const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    navlist: [
      {
        cateName: '竞拍中',
        cateId: '5'
      },
      {
        cateName: '已截拍',
        cateId: '1'
      },
      {
        cateName: '已流拍',
        cateId: '2'
      },
      {
        cateName: '草搞箱',
        cateId: '3'
      }
    ],
    orderlist: [],
    //分页
    page: 1,
    status: 5,
    loadover: false,
    msg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      tabIndex: options.tabIndex || 0
    })
    this.getList(options.id || 5);
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
    if (this.data.loadover) return
    let that = this;
    that.scrollLoad(that.data.status, orderlist => {
      orderlist = this.data.orderlist.concat(orderlist)
      that.setData({
        orderlist: orderlist
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //滚动加载更多
  loadmore: function () {

  },

  //tab点击事件
  navtab: function (e) {

    let id = e.detail.id;
    console.log(id)
    this.getList(id);
  },

  getList(status) {
    this.setData({
      status: status,
      page: 1,
      loadover: false,
      msg: ''
    })
    action.getOrderList({
      status: status,
      page: 1
    }).then(res => {
      let orderlist = util.transformImgUrls(res.data.orderlist, 'imgUrl');
      for (let i = orderlist.length - 1; i >= 0; i--) {
        orderlist[i].statusText = util.getStatusText(orderlist[i].orderStatus)
      }
      this.setData({
        orderlist: orderlist
      })
    })
  },

  scrollLoad(status, cb) {
    this.setData({
      page: ++this.data.page
    })
    action.getOrderList({
      status: status,
      page: this.data.page
    }).then(res => {
      if (res.data.orderlist.length <= 0) {
        this.setData({
          loadover: true,
          msg: '数据加载完成!'
        })
        return
      }
      let orderlist = util.transformImgUrls(res.data.orderlist, 'imgUrl');
      for (let i = orderlist.length - 1; i >= 0; i--) {
        orderlist[i].statusText = util.getStatusText(orderlist[i].orderStatus)
      }

      cb && cb(orderlist)
    })
  }


})