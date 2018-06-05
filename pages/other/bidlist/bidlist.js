// pages/other/bidlist/bidlist.js
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    auctionItemId: '',
    bidlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      auctionItemId: options.id || 106
    })
    this.getBidList();
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

  //出价记录
  getBidList() {
    action.bidList({
      auctionItemId: this.data.auctionItemId
    }).then(res => {
      let bidlist = res.data.items;
      for (let item of bidlist) {
        item.datetime = util.formatTime(item.bidTime);
      }
      this.setData({
        currentPrice: res.data.latestBidPrice,
        nextBidPrice: res.data.nextBidPrice,
        bidlist: bidlist
      })
    })
  },
})