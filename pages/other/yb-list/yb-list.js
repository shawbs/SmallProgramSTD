// yb-list.js
const app = getApp()

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist: [
      {
        cateName: '全部',
        cateId: '0'
      }, 
      {
        cateName: '进行中',
        cateId: '1'
      }, 
      {
        cateName: '已揭晓',
        cateId: '2'
      }
    ],
    lottoList: []
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },



  navtab: function(e){
    this.initPage(e.detail.id)
  },

  //初始化页面
  initPage(type = 0){
    action.getLottoHistory({
      page: 1,
      limit: 10,
      type: type
    }).then(res=>{
      this.setData({
        lottoList: res.data.lottoItems
      })
    })
  },

  //前往我的号码页
  linkYbNumber(e){
    console.log(e.target.dataset)
    let luckNum = e.target.dataset.luckNum;
    let nums = e.target.dataset.nums;
    wx.setStorageSync('lotto_lucknum', luckNum)
    wx.setStorageSync('lotto_nums', nums)
    wx.navigateTo({
      url: '/pages/other/yb-number/yb-number',
    })
  }
})