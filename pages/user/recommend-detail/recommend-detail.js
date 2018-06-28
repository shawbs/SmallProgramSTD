// pages/user/recommend-detail/recommend-detail.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs: [],
    orderlist: [],
    detail:null,
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = options.userId;
    let partnerToken = options.partnerToken;
    this.setData({
      type: options.type
    })
    this.initPage(partnerToken,userId)
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



  initPage(partnerToken,userId){
    console.log(this.data.type)
    if(this.data.type == 1){
      action.getInviteDetails({
        partnerToken: partnerToken,
        userId: userId
      }).then(res => {
        this.setData({
          detail: res.data.detailsDto,
          logs: res.data.logs,
          orderlist: res.data.orderlist
        })
      })
    }
    if (this.data.type == 2) {
      action.getInviteDetails2({
        partnerToken: partnerToken,
        userId: userId
      }).then(res => {
        this.setData({
          detail: res.data.detailsDto,
          logs: res.data.logs,
          orderlist: res.data.orderlist
        })
      })
    }
    
  }
})