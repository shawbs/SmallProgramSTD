// pages/other/history/history.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist: [
      { cateId: '0', cateName: '精品拍场' },
      { cateId: '2', cateName: '藏家拍场' },
      // { cateId: '2', cateName: '艺术拍场' }
    ],
    id:0,
    list: [],
    auctionInfo: null,
    msg: '',
    exType: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.initPage();
    setTimeout(function(){
      wx.stopPullDownRefresh();
    },1000)
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
    action.getHistoryList({
      historyType: this.data.id,
      page: 1
    }).then(res=>{

      if(res.data){
        let auctionInfo = { ...res.data.auctionInfo};
        let list = res.data.items;
        auctionInfo.imgUrl = JSON.parse(auctionInfo.imgUrl);
        auctionInfo.startTimeText = util.formatTimeSimple(auctionInfo.startTime)
        util.transformImgUrls(list, 'imgUrls');
        this.setData({
          list: list,
          auctionInfo: auctionInfo
        })
      }else{
        this.setData({
          list: [],
          auctionInfo: null,
          msg: app.globalData.msgLoadNone
        })
      }
      
    })
  },

  navtab(e){
    let id = e.detail.id;
    this.setData({
      id: id,
      msg: ''
    })
    if(id == 0){
      this.setData({
        exType: 1
      })
    }
    if (id == 2) {
      this.setData({
        exType: 2
      })
    }
    this.initPage()
  }
})