// pages/user/consignment/consignment.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPage: 1,
    list: null,

    page: 1,
    loading: false,
    msg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPage();
    app.globalData.payType = 4;
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
    this.scrollLoad(res=>{
      let list = [...res.data.msglist];
      for (let item of list) {
        item.imgUrl = JSON.parse(item.imgUrl)
      }
      this.setData({
        list: [...this.data.list, ...list]
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  initPage(){
    action.getConsignmentList({
      limit: 10,
      page: 1
    }).then(res=>{
      let list = [...res.data.msglist];
      for(let item of list){
        item.imgUrl = JSON.parse(item.imgUrl)
      }
      this.setData({
        list: list,
        totalPage: res.data.totalPage
      })
    })
  },

  scrollLoad(cb){
    if (this.data.page < this.data.totalPage){
      if(!this.data.loading){
        this.setData({
          page: ++this.data.page,
          loading: true,
          msg: app.globalData.msgLoading
        })
        action.getConsignmentList({
          limit: 10,
          page: this.data.page
        }).then(res => {
          cb && cb(res)
          this.setData({
            loading: false,
            msg: ''
          })
        })
      }
    }else{
      this.setData({
        msg: app.globalData.msgLoadOver
      })
    }
  },

  //删除寄存订单
  deleteConsignment(e){
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    action.deleteConsignment({
      consignmentId: id
    }).then(res=>{
      let list = this.data.list;
      index in list && list.splice(index,1);
      this.setData({
        list: list
      })
    })
  },

  //自取寄存订单
  feeConsignment(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    action.feeConsignment({
      consignmentId: id
    }).then(res => {
      let fee = res.data.fee;
      action.getConsignmentPay({
        consignmentId: id,
        fee: fee
      }).then(res2=>{
        wx.navigateTo({
          url: `/pages/user/pay/pay?paymentNo=${res2.data.paymentNo}`
        })
      })
    })
  }
})