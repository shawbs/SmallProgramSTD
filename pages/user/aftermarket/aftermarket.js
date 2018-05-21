// pages/user/aftermarket/aftermarket.js
const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')

let PAGE = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.initPage();
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

  initPage(){
    let that = this;
    that.fetchData(0,function(data){
      let list = data.returnlist;
      for(let item of list){
        item.statusText = util.getAfterStatusText(item.returnStatus);
        item.imgUrl = JSON.parse(item.imgUrl)
      }
      that.setData({
        list: list
      })
    })
  },

  fetchData(status,cb){
    action.getAftermarketList({
      status: status,
      page: PAGE,
      limit: 10
    }).then(res=>{
      cb && cb(res.data)
    })
  },

  

})