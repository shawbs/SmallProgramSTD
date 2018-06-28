// pages/user/card-list/card-list.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    originType: 0, // 0默认,1来自提现页面
    cardList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //如果是从提现进入当前页面
    if(options.type){
      this.setData({
        originType: options.type || 0
      })
    }
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


  //初始
  initPage(){
    action.getCardList().then(res=>{
      this.setData({
        cardList: res.data.list
      })
    })
  },

  //点击银行卡处理
  tapCard(e){

    let dataset = e.currentTarget.dataset;
    let storge = {
      cardNo: dataset.no,
      cardName: dataset.name,
      cardToken: dataset.token,
      cardId: dataset.id,
      imgurl: dataset.imgurl
    }
    let originType = this.data.originType;
    if (originType == 1){
      app.globalData.bankCard_default = storge;
      wx.navigateTo({
        url: `/pages/user/withdraw/withdraw?checked=1`,
      })
    }else{ 
      app.globalData.bankCard = storge;
      wx.navigateTo({
        url: `/pages/user/card-edit/card-edit?type=edit`,
      })
    }
  }
})