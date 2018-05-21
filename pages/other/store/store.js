// pages/store/store.js
const action = require('../../../api/action.js')
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
    navlist: [{
      cateName:'全部',
      cateId: 0
    }],
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initListInfo();
    this.initCateType();
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
    .then(function(){
      wx.stopPullDownRefresh()
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    if (LOADOVER){
      return
    }
    let _this = this;
    let _page = PAGE;
    action.getStoreListInfo({
      cateId: CATEID,
      limit: 10,
      page: ++_page
    })
    .then(res => {
      let treasurelist = res.data.treasurelist;
      if(treasurelist.length > 0){
        _this.setData({
          listData: _this.data.listData.concat(treasurelist)
        })
        PAGE = _page
      }else{
        _this.setData({
          msg: '全部数据已加载完成'
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
  initListInfo(cateId=0){
    let _this = this;
    return action.getStoreListInfo({
      cateId: cateId,
      limit: 10,
      page: 1
    })
    .then(res=>{
      let treasurelist = res.data.treasurelist
      if(treasurelist.length>0){
        _this.setData({
          listData: treasurelist
        })
      }else{
        _this.setData({
          msg: '无数据'
        })
      }
      
    })
    .catch(msg=>{
      console.log(msg)
    })
  },

  //初始商品类型
  initCateType(){
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

  navtab(e){
    let cateId = e.detail.id
    CATEID = cateId
    PAGE = 1
    LOADOVER = false
    this.setData({
      msg: ''
    })
    
    this.initListInfo(cateId)
  }



})