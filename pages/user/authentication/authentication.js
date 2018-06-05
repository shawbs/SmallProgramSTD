// pages/user/authentication/authentication.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    checkInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  initPage() {
    //如果正在申请商户,设checkInfo为1,反之则设为实名认证状态
    this.getMerchantApplyStatus((data)=>{
      if (data.isexist){
        console.log(data)
        this.setData({
          checked: true,
          checkInfo: {
            checkStatus: data.checkStatus
          }
        })
      }else{
        //获取实名认证状态信息
        action.getIdentificationStatus().then(res => {
          if (res.data.isexist) {
            this.setData({
              checked: true,
              checkInfo: res.data.certifyEntity
            })
          }else{
            this.setData({
              checked: false,
              checkInfo: null
            })
          }
        })
      }
    })
  },

  //获取商户申请状态
  getMerchantApplyStatus(cb) {
    action.getMerchantApplyStatus().then(res => {
      cb && cb(res.data)
    })
  }
})