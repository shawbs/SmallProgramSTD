// pages/yb-number/yb-number.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nums: [],
    luckNum: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let nums = wx.getStorageSync('lotto_nums');
      let luckNum = wx.getStorageSync('lotto_lucknum');
      if (nums){
        this.setData({
          nums: nums,
          luckNum: luckNum
        })
      }
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
    wx.removeStorage('lotto_nums')
    wx.removeStorage('lotto_lucknum')
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
  
  }
})