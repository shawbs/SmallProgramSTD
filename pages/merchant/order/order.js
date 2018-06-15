// pages/order/order.js
const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    navlist: [
      {
        cateName: '全部',
        cateId: '0'
      }, 
      {
        cateName: '待付款',
        cateId: '1'
      }, 
      {
        cateName: '待发货',
        cateId: '2'
      },
      {
        cateName: '待收货',
        cateId: '3'
      },
      {
        cateName: '售后',
        cateId: '4'
      }
    ],
    orderlist:[],
    //分页
    page: 1,
    status: 0,//订单状态
    loadover: false,
    msg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tabIndex: options.tabIndex || 0,
      status: options.id ||0
    })
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
    this.initPage();
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loadover) return
    this.setData({
      page: ++this.data.page
    })
    action.getMerchantOrderList({
      status: this.data.status,
      page: this.data.page
    }).then(res => {
      if (res.data.orderlist.length > 0) {
        let orderlist = util.transformImgUrls(res.data.orderlist, 'imgUrl');
        for (let i = orderlist.length - 1; i >= 0; i--) {
          orderlist[i].statusText = util.getStatusText(orderlist[i].orderStatus)
        }
        this.setData({
          orderlist: [...this.data.orderlist, ...orderlist]
        })
      } else {
        this.setData({
          msg: '无数据'
        })
      }

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //tab点击事件
  navtab: function (e) {
    let id = e.detail.id;
    this.setData({
      status: id,
      page: 1,
      loadover: false,
      msg: ''
    })
    this.getList();
  },

  //初始化
  initPage(){
    this.setData({
      page: 1,
      loadover: false,
      msg: ''
    })
    this.getList();
  },

  //获取商户订单列表
  getList(){
    action.getMerchantOrderList({
      status: this.data.status,
      page: 1
    }).then(res=>{
      if (res.data.orderlist.length>0){
        let orderlist = util.transformImgUrls(res.data.orderlist, 'imgUrl');
        for (let i = orderlist.length - 1; i >= 0; i--) {
          orderlist[i].statusText = util.getStatusText(orderlist[i].orderStatus)
        }
        this.setData({
          orderlist: orderlist
        })
      }else{
        this.setData({
          msg: '无数据'
        })
      }
    })
  },


  
})