// pages/store/store.js
const action = require('../../../api/action.js')
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
    
    this.initListInfo()
    .then(function(){
      wx.stopPullDownRefresh()
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    if (LOADOVER || LOADING) return

    LOADING = true
    action.getStoreListInfo({
      cateId: CATEID,
      limit: 10,
      page: ++PAGE
    })
    .then(res => {
      let treasurelist = res.data.treasurelist;
      if(treasurelist.length > 0){
        this.setData({
          listData: this.data.listData.concat(treasurelist)
        })
      }else{
        this.setData({
          msg: app.globalData.msgLoadOver,
        })
        LOADOVER = true
      }
      LOADING = false
      
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
  initListInfo(){
    return action.getStoreListInfo({
      cateId: CATEID,
      limit: 10,
      page: 1
    })
    .then(res=>{
      let treasurelist = res.data.treasurelist
      if(treasurelist.length>0){
        this.setData({
          listData: treasurelist
        })
      }else{
        this.setData({
          msg: app.globalData.msgLoadNone,
        })
      }
      
    })
    .catch(msg=>{
      console.log(msg)
    })
  },

  //初始商品类型
  initCateType(){
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

  navtab(e){
    let cateId = e.detail.id
    CATEID = cateId
    PAGE = 1
    LOADOVER = false
    this.setData({
      msg: ''
    })
    
    this.initListInfo()
  }



})