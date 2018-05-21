//index.js
//获取应用实例
const app = getApp()

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')

Page({
  data: {
    banner: null,
    jsLive: null,
    jxLive: null,
    zpLive: null
  },
  //事件处理函数
  bindViewTap: function() {
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

  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.initPage();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function(){
    this.initPage();
    setTimeout(function(){
      wx.stopPullDownRefresh()
    },1000)
  },

  //判断直播是否开始
  toLive: function(e){
    let target = e.currentTarget
    let id = target.dataset.id
    if(target.dataset.type ==2){
      wx.navigateTo({
        url: '../../live/live/live'
      })
    }else{
      wx.navigateTo({
        url: `../../other/list/list?auctionId=${id}&type=1`
      })
    }
    
  },

  transformImgUrls(arr) {
    if(arr.length>0){
      for (let i = (arr.length - 1); i >= 0; i--) {
        arr[i].imgList = JSON.parse(arr[i].imgList)
        arr[i].startTime = util.relativeDate(arr[i].startTime)
      }
    }
    return arr;
  },

  initPage(){
    let _this = this;

    action.getBanner()
      .then(res => {
        _this.setData({
          banner: res.data.dtolist
        })
      })

    // action.getZPLive()
    //   .then(res => {
    //     let items = [...res.data.items]
    //     console.log(items)
    //     _this.setData({
    //       zpLive: _this.transformImgUrls(items)
    //     })
    //   })

    action.getJSLive()
      .then(res => {
        let items = [...res.data.items]
        // console.log(items)
        _this.setData({
          jsLive: _this.transformImgUrls(items)
        })
      })

    action.getJXLive()
      .then(res => {
        let items = [...res.data.items]
        // console.log(items)
        _this.setData({
          jxLive: _this.transformImgUrls(items)
        })
      })
  }

})
