// pages/user/card-edit/card-edit.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',

    //选中的卡
    bankCard: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type || 'add'
    })

    if (options.type == 'edit'){
      // let bankCard = wx.getStorageSync('bankCard');
      let bankCard = app.globalData.bankCard;
      this.setData({
        bankCard: bankCard
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

  //添加银行卡
  addCard(e){
    console.log(e)
    let parameter = e.detail.value;
    for(let key in parameter){
      if (!parameter[key]){
        wx.showToast({
          title: '持卡人或卡号不能为空',
          icon: 'none'
        })
        return
      }
    }

    action.addCard(parameter).then(res=>{
      wx.redirectTo({
        url: '/pages/user/card-list/card-list',
      })
    })

  },

  //删除银行卡
  deleteCard(){
    let id = this.data.bankCard.cardId;
    action.deleteCard(id).then(res=>{
      wx.showToast({
        title: '删除成功',
      })
      setTimeout(function(){
        wx.redirectTo({
          url: '/pages/user/card-list/card-list',
        })
      },1000)
    })
  }

})