// pages/user/logistics/logistics.js
const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNo: options.orderNo
    })
    this.initPage();
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


  initPage(){
    action.getLogistics({
      orderNo: this.data.orderNo
    }).then(res=>{
      let logistics = {...res.data};
      logistics.imgUrl = JSON.parse(logistics.imgUrl)
      this.setData({
        logistics: logistics,
        entry:logistics.entry
      })
    })
  },

  //拨打电话联系
  connectTel() {
    let arr = ['0592-5220601', '15811477498']
    wx.showActionSheet({
      itemList: arr,
      success: function (res) {
        wx.makePhoneCall({
          phoneNumber: arr[res.tapIndex]
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }
})