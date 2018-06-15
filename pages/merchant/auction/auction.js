// pages/merchant/auction/auction.js

const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
const ob = require('../../../utils/observer.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    navlist: [
      {
        cateName: '竞拍中',
        cateId: '0'
      },
      {
        cateName: '已截拍',
        cateId: '1'
      },
      {
        cateName: '已流拍',
        cateId: '2'
      },
      {
        cateName: '草搞箱',
        cateId: '3'
      }
    ],
    orderlist: [],
    //分页
    page: 1,
    status: 0,
    loadover: false,
    msg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.tabIndex ;
    this.setData({
      tabIndex: index || 0,
      status: options.status || 0
    })
    if (index == 3) {
      this.merchantAuction();
    } else {
      this.getList(this.data.status);
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
    if(this.data.status == 3)return
    if(!this.data.loadover){
      action.merchantAuctionList({
        status: this.data.status,
        page: ++this.data.page,
        limit: 10
      }).then(res => {
        let list = res.data.list;
        if (list.length > 0) {
          this.setData({
            orderlist: this.data.orderlist.concat(list)
          })
        } else {
          this.setData({
            msg: '数据加载完成！',
            loadover: true
          })
        }
      })
    }
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //滚动加载更多
  loadmore: function () {

  },

  //tab点击事件
  navtab: function (e) {
    let id = e.detail.id;
    this.setData({
      status: id,
      orderlist: []
    })
    if(id == 3){
      this.merchantAuction();
    }else{
      this.getList(id);
    }
  },

  //获取拍品列表
  getList(status) {
    this.setData({
      status: status,
      page: 1,
      loadover: false,
      msg: ''
    })
    action.merchantAuctionList({
      status: status,
      page: 1,
      limit: 10
    }).then(res => {
      this.setData({
        orderlist: res.data.list
      })
    })
  },

  //获取草稿箱
  merchantAuction(){
    action.merchantAuction({
    }).then(res=>{
        this.setData({
          orderlist: res.data.list
        })
    })
  },

  //删除草稿箱
  deleteAuction(e){
    let token = e.target.dataset.token;
    let index = e.target.dataset.index;
    action.merchantAuctionDelete({
      productToken: token
    }).then(res=>{
      let list = this.data.orderlist;
      list.splice(index,1);
      this.setData({
        orderlist: list
      })
    })

  },

  //前往上架
  linkPushAuction(e){
    let token = e.target.dataset.token;
    let type = e.target.dataset.type || 1;
    wx.navigateTo({
      url: `/pages/merchant/push/push?type=${type}&token=${encodeURIComponent(token)}`,
    })
  },

  //下架
  soldout(e){
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    action.merchantAuctionOut({
      itemId: id
    }).then(res=>{
      wx.showToast({
        title: '下架成功',
      })
      let list = this.data.orderlist;
      list.splice(index,1);
      this.setData({
        orderlist: list
      })
    })
  },

  //前往编辑
  linkAuctionEdit(e){
    let token = e.target.dataset.token;
    app.globalData.token = token;
    ob.emit('pushlish_refresh',token)
    wx.switchTab({
      url: '/pages/tabBar/publish/publish',
    })
  }

})