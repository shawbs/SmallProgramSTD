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
        cateId: '5'
      },
      {
        cateName: '待确认',
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
        cateName: '已成交',
        cateId: '4'
      }
    ],
    orderlist:[],
    //分页
    page: 1,
    status: 5,
    loadover: false,
    msg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      tabIndex: options.tabIndex || 0,
      status: options.id || 5,
    })
    this.initPage();
    app.globalData.payType = 0;
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
    let that = this;
    that.scrollLoad(orderlist=>{
      let arr = [...this.data.orderlist,...orderlist];
      that.setData({
        orderlist: arr
      })
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
      status: id
    })
    this.initPage();
  },

  // 获取订单列表
  initPage(){
    this.setData({
      page: 1,
      loadover: false,
      msg: ''
    })
    action.getOrderList({
      status: this.data.status,
      page: 1
    }).then(res=>{
      let orderlist = util.transformImgUrls(res.data.orderlist, 'imgUrl');
      for(let i=orderlist.length-1;i>=0;i--){
        orderlist[i].statusText = util.getStatusText(orderlist[i].orderStatus)
      } 
      this.setData({
        orderlist: orderlist
      })
    })
  },

  //滚动加载
  scrollLoad(cb){
    this.setData({
      page: ++this.data.page
    })
    action.getOrderList({
      status: this.data.status,
      page: this.data.page
    }).then(res => {
      if (res.data.orderlist.length<=0){
        this.setData({
          loadover: true,
          msg: '数据加载完成!'
        })
        return
      }
      let orderlist = util.transformImgUrls(res.data.orderlist, 'imgUrl');
      for (let i = orderlist.length - 1; i >= 0; i--) {
        orderlist[i].statusText = util.getStatusText(orderlist[i].orderStatus)
      }

      cb && cb(orderlist)
    })
  },

  //前往支付
  linkPay(e){
    let paymentno = e.currentTarget.dataset.paymentno;
    let token = e.currentTarget.dataset.token;
    let orderno = e.currentTarget.dataset.orderno;
    // console.log(e, paymentno, token, orderno)
    let isofflinepay = e.currentTarget.dataset.isofflinepay;//是否正在进行线下支付
    if (isofflinepay == true){
      wx.showModal({
        title: '温馨提示',
        content: '您已经申请了线下支付渠道，是否更换其它支付方式？',
        success: function (res) {
          if (res.confirm) {
            let url = paymentno ? `/pages/user/pay/pay?paymentNo=${paymentno}` : `/pages/user/order-confirm/order-confirm?step=2&token=${token}&orderNo=${orderno} `;

            wx.navigateTo({
              url: url,
            })
          } else if (res.cancel) {
            return
          }
        }
      })
    }else{
      let url = paymentno ? `/pages/user/pay/pay?paymentNo=${paymentno}` : `/pages/user/order-confirm/order-confirm?step=2&token=${token}&orderNo=${orderno} `;

      wx.navigateTo({
        url: url,
      })
    }

    
  },

  //收货
  postReceiving(e){
    let orderno = e.currentTarget.dataset.orderno;
    action.postOrderReceived({
      orderNo: orderno
    }).then(res=>{
      wx.showToast({
        title: '收货完成',
      })
    })
  },

  //重新配置订单
  postOrderReconfig(e){
    let orderno = e.currentTarget.dataset.orderno;
    let token = e.currentTarget.dataset.token;
    action.postOrderReconfig({
      orderNo: orderno
    }).then(res=>{
      wx.navigateTo({
        url: `/pages/user/order-confirm/order-confirm?step=2&token=${token}&orderNo=${orderno}`,
      })
    })
  }

  
})