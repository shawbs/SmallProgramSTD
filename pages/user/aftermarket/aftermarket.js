// pages/user/aftermarket/aftermarket.js
const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],

    page: 1,
    loadover: false,
    loading: false,
    msg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if(this.data.loading || this.data.loadover) return

    this.setData({
      loading: true,
      page: ++this.data.page
    })
    action.getAftermarketList({
      status: 0,
      page: this.data.page,
      limit: 10
    }).then(res => {
      let list = res.data.returnlist;
      if (list.length > 0) {
        for (let item of list) {
          item.statusText = util.getAfterStatusText(item.returnStatus);
          item.imgUrl = JSON.parse(item.imgUrl)
        }
        this.setData({
          list: [...this.data.list, ...list]
        })
      } else {
        this.setData({
          loadover: true,
          msg: app.globalData.msgLoadOver
        })
      }
      this.setData({
        loading: false
      })
    })
  },



  initPage(){
    action.getAftermarketList({
      status: 0,
      page: this.data.page,
      limit: 10
    }).then(res => {
      let list = res.data.returnlist;
      if(list.length > 0){
        for (let item of list) {
          item.statusText = util.getAfterStatusText(item.returnStatus);
          item.imgUrl = JSON.parse(item.imgUrl)
        }
        this.setData({
          list: list
        })
      }else{
        this.setData({
          msg: app.globalData.msgLoadNone
        })
      }
    })
  }


})