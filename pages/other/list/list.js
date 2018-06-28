// pages/list/list.js
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
const app = getApp();

let PAGE = 1
let CATEID = 0
let LOADOVER = false
let LOADING = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '',
    exType: 2, //预展1，即时2
    auctionId: 0,
    navlist: [{
      cateName: '全部',
      cateId: 0
    }],
    previewInfo:null,
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      auctionId: options.auctionId || 645,
      exType: options.type || 2
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.initCateType();
    if(this.data.exType == 2){
      this.initListInfo();
    }else{
      this.initPreviewInfo();
    }
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

    this.initListInfo()
    .then(function () {
      wx.stopPullDownRefresh()
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    //预展无分页，加载完不触发
    if (LOADOVER || LOADING || this.data.exType ==1) {
      return
    }
    LOADING = true;
    this.setData({
      msg: app.globalData.msgLoading
    })
    action.getListInfo({
      cateId: -1,
      pageSize: 10,
      pageNumber: ++PAGE,
      auctionId: this.data.auctionId
    })
      .then(res => {
        let treasurelist = [...res.data.items];
        if (treasurelist.length > 0) {
          this.transformImgUrls(treasurelist)
          this.setData({
            listData: this.data.listData.concat(treasurelist)
          })
        } else {
          this.setData({
            msg: app.globalData.msgLoadOver
          })
          LOADOVER = true
        }
        LOADING = false
      })
      .catch(msg => {
        LOADING = false
      })


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //初始化列表
  initListInfo() {
    return action.getListInfo({
      cateId: CATEID,
      pageSize: 10,
      pageNumber: 1,
      auctionId: this.data.auctionId
    })
    .then(res => {
      let treasurelist = [...res.data.items]
      if (treasurelist.length > 0) {
        this.transformImgUrls(treasurelist)
        this.setData({
          listData: treasurelist
        })
      } else {
        this.setData({
          msg: app.globalData.msgLoadNone
        })
      }

    })
    .catch(msg => {
      console.log(msg)
    })
  },

  //初始商品类型
  initCateType() {
    action.getStoreCateType({})
    .then(res => {
      this.setData({
        navlist: this.data.navlist.concat(res.data.cateList)
      })
    })
    .catch(msg => {
      console.log(msg)
    })
  },

  //初始化预展
  initPreviewInfo(){

    return action.getPreviewInfo(this.data.auctionId)
    .then(res=>{
      let list = res.data.items
      let auctionInfo = { ...res.data.auctionInfo}
      auctionInfo.imgUrls = JSON.parse(auctionInfo.imgUrls)
      auctionInfo.startTime = util.formatTime(auctionInfo.startTime)
      this.transformImgUrls(list)
      if(list.length>0){
        this.setData({
          listData: list,
          previewInfo: auctionInfo
        })
      }else{
        this.setData({
          msg: app.globalData.msgLoadNone
        })
      } 
    })
    .catch(msg => {
      console.log(msg)
    })

  },

  //切换类别
  navtab(e) {
    let cateId = e.detail.id
    CATEID = cateId
    PAGE = 1
    LOADOVER = false
    this.setData({
      msg: ''
    })
    this.initListInfo()
  },

  //转换json字符串数组为js数组
  transformImgUrls(arr){
    for (let i = (arr.length - 1); i >= 0; i--){
      arr[i].imgUrls = JSON.parse(arr[i].imgUrls)
    }
  }



})