// pages/list/list.js
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
const app = getApp();

let PAGE = 1
let CATEID = 0
let LOADOVER = false

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

    this.initListInfo(CATEID)
    .then(function () {
      wx.stopPullDownRefresh()
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    //预展无分页，加载完不触发
    if (LOADOVER || this.data.exType ==1) {
      return
    }
    let _this = this;
    let _page = PAGE;
    action.getListInfo({
      cateId: -1,
      pageSize: 10,
      pageNumber: ++_page,
      auctionId: _this.data.auctionId
    })
      .then(res => {
        let treasurelist = [...res.data.items];
        if (treasurelist.length > 0) {
          this.transformImgUrls(treasurelist)
          _this.setData({
            listData: _this.data.listData.concat(treasurelist)
          })
          PAGE = _page
        } else {
          _this.setData({
            msg: '数据加载完成!'
          })
          LOADOVER = true
        }

      })
      .catch(msg => {
        console.log(msg)
      })


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //初始化列表
  initListInfo(cateId = 0) {
    let _this = this;
    return action.getListInfo({
      cateId: -1,
      pageSize: 10,
      pageNumber: 1,
      auctionId: _this.data.auctionId
    })
    .then(res => {
      let treasurelist = [...res.data.items]
      if (treasurelist.length > 0) {
        this.transformImgUrls(treasurelist)
        _this.setData({
          listData: treasurelist
        })
      } else {
        _this.setData({
          msg: '无数据!'
        })
      }

    })
    .catch(msg => {
      console.log(msg)
    })
  },

  //初始商品类型
  initCateType() {
    let _this = this;
    action.getStoreCateType({})
    .then(res => {
      _this.setData({
        navlist: _this.data.navlist.concat(res.data.cateList)
      })
    })
    .catch(msg => {
      console.log(msg)
    })
  },

  //初始化预展
  initPreviewInfo(){
    let _this = this;
    return action.getPreviewInfo(_this.data.auctionId)
    .then(res=>{
      let list = res.data.items
      let auctionInfo = { ...res.data.auctionInfo}
      auctionInfo.imgUrls = JSON.parse(auctionInfo.imgUrls)
      auctionInfo.startTime = util.formatTime(auctionInfo.startTime)
      console.log(auctionInfo, res.data.auctionInfo)
      _this.transformImgUrls(list)
      if(list.length>0){
        _this.setData({
          listData: list,
          previewInfo: auctionInfo
        })
      }else{
        _this.setData({
          msg: '无数据!'
        })
      }
      
    })
    .catch(msg => {
      console.log(msg)
    })

  },

  navtab(e) {
    let cateId = e.detail.id
    CATEID = cateId
    PAGE = 1
    LOADOVER = false
    this.setData({
      msg: ''
    })

    this.initListInfo(cateId)
  },

  transformImgUrls(arr){
    for (let i = (arr.length - 1); i >= 0; i--){
      arr[i].imgUrls = JSON.parse(arr[i].imgUrls)
    }
    // console.log(arr)
  }



})