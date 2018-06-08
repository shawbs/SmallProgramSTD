// pages/detail/detail.js
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
const base = require('../../../utils/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    auctionItemId: '',
    swiper:{
      height: '240px'
    },
    tabIndex: 0,
    detail: null,
    pmgz:'',
    countTime: '',

    currentPrice: '',
    nextBidPrice: 0,
    bidlist: [],
    hideModel: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      auctionItemId: options.id || ''
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  initPage(){
    this.getBidList();
    this.getDetail();
    this.getPMGZ();
    
  },

  //tab点击
  tabclick:function(e){
    var o = {}
    o[e.currentTarget.dataset.id] = 'active'
    this.setData({
      tabData: o
    })
  },
  //图片高度适应
  swiperAutoHeight: function(){
    wx.createSelectorQuery().select('#the-id').boundingClientRect(function (rect) {
      this.setData({
        swiper:{
          height: rect.width*(2/3)
        }
      })
    }).exec()
  },
  tab: function (e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },

  //获取详情
  getDetail(){
    action.getMerchantAuctionInfo({
      auctionItemId: this.data.auctionItemId
    })
    .then(res=>{
      let detail = { ...res.data};
      let arr = [];
      for (let item in detail.propertieslist){
        arr.push({
          name : this.getParamsText(item),
          value : detail.propertieslist[item]
        })
      }
      detail.propertieslist = arr;
      this.setData({
        detail: detail
      })
      this.getCountTime();


      if (base.checkLogin()) {
        this.addLooker();
      }
    })

  },

  //加入围观
  addLooker(){
    action.merchantAddLooker({
      itemToken: this.data.detail.itemToken
    }).then(res=>{

    })
  },

  //获取拍卖规则
  getPMGZ(){
    let _this = this;
    action.getPMGZ()
    .then(res=>{
      _this.setData({
        pmgz: res
      })
    })
    .catch()
  },

  //图片放大
  previewImage(e) {
    console.log(e)
    let target = e.target;
    let urls = this.data.detail.imgUrl;
    wx.previewImage({
      current: target.dataset.img,
      urls: urls,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //加一手
  addPrice(){
    let nextprice = this.data.nextBidPrice;
    let _this = this;
    wx.showModal({
      title: '提示',
      content: `加价${nextprice/100}元`,
      success: function(res){
        if (res.confirm){
          _this.postPrice(nextprice);
        }
      }
    })
  },

  //显示自由出价框
  customAddPrice(){
    this.setData({
      hideModel: false
    })
  },

  //自由出价
  submitPrice(e){
    // console.log((~~e.detail.value) * 100)
    this.postPrice((~~e.detail.value)*100);
  },

  //加价
  postPrice(price){
    action.merchantBid({
      biddableToken: this.data.detail.biddableToken,
      itemToken: this.data.detail.itemToken,
      bidPrice: price
    }).then(res=>{
      //更新加价记录
      this.getBidList();
      wx.showToast({
        title: '加价成功',
      })
    })
  },

  //倒计时
  getCountTime(){
    let that = this;
    setInterval(function () {
      let countTime = util.getCountDown(that.data.detail.endTime);
      // console.log(countTime)
      that.setData({
        countTime: countTime
      })
    }, 1 * 1000)

  },

  //出价记录
  getBidList(){
    action.merchantBidInfo({
      auctionItemId: this.data.auctionItemId
    }).then(res=>{
        let bidlist = res.data.items;
        for(let item of bidlist){
          item.datetime = util.formatTime(item.bidTime);
        }
        this.setData({
          currentPrice: res.data.latestBidPrice,
          nextBidPrice: res.data.nextBidPrice,
          bidlist: bidlist
        })
    })
  },

  //关注
  toggleGuanzhu(){
    let detail = this.data.detail;
    let remind = detail.remind;
    if(remind){
      detail.remind = false;
    }else{
      detail.remind = true;
    }
    this.setData({
      detail: detail
    })
    action.postGuanzhu({
      itemToken: this.data.detail.itemToken,
      isRemind: Number(!remind)
    }).then(res => { })
  },

  getParamsText(key){
    let o = {
      "conditions": "品相",
      "weight": "重量",
      "professor": "职称",
      "century": "年代",
      "inscription": "款识",
      "material": "材质",
      "specifications": "规格"
    }
    return o[key]
  }



})