// pages/other/identify-list/identify-list.js
const app = getApp()

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    entries: [],
    
    page: 1,
    loadover: false,
    loading: false,
    msg: ''
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
    if (this.data.loading || this.data.loadover) return

    this.setData({
      loading: true,
      page: ++this.data.page
    })
    action.getJBlist({
      page: this.data.page,
      limit: 10
    }).then(res => {
      let entries = [...res.data.entries]
      if (entries.length > 0) {
        for (let item of entries) {
          item.appraisalTime = util.formatTimeSimple(item.appraisalTime)
          item.createTime = util.formatTimeSimple(item.createTime)
        }
        this.setData({
          entries: [...this.data.entries, ...entries]
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
    action.getJBlist({
      page:1,
      limit: 10
    }).then(res=>{
      let entries = [ ...res.data.entries]
      if (entries.length > 0){
        for (let item of entries){
          item.appraisalTime = util.formatTimeSimple(item.appraisalTime)
          item.createTime = util.formatTimeSimple(item.createTime)
        }
        this.setData({
          entries: entries
        })
      }else{
        this.setData({
          msg: app.globalData.msgLoadNone
        })
      }
    })
  }
})