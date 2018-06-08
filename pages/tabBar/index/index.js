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
    zpLive: null,

    page: 1,
    loadover: false,
    loading: false,
    merchantList: []
  },
  //事件处理函数
  bindViewTap: function() {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPage();
    //获取商户入驻首页拍品
    this.getMerchantAuctionList();
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function(){
    this.initPage();
    this.getMerchantAuctionList();
    setTimeout(function(){
      wx.stopPullDownRefresh()
    },1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(!this.data.loadover){
      if (!this.data.loading) {
        this.setData({
          loading: true,
          page: ++this.data.page
        })
        action.getMerchantAuctionList({
          page: this.data.page,
          limit: 10
        }).then(res => {
          if (!res.data.list.length){
            this.setData({
              loadover: true
            })
          }else{
            this.setData({
              merchantList: res.data.list
            })
          }
        })
      }
    }

  },

  //判断直播是否开始进行跳转
  toLive: function(e){
    let target = e.currentTarget;
    let id = target.dataset.id;
    let auctionNo = target.dataset.auctionno;
    if(target.dataset.type ==2){
      wx.showToast({
        title: '请下载APP观看或微信公众号进入观看!',
      })
      // wx.navigateTo({
      //   url: '../../live/live/live'
      // })
      // let url = encodeURIComponent('https://app.shuntd.cn/shuntd/preview-ing/' + auctionNo + '-'+ id +'.html');
      // wx.navigateTo({
      //   url: `/pages/live/live-h5/live-h5?url=${url}`
      // })
    }else{
      wx.navigateTo({
        url: `../../other/list/list?auctionId=${id}&type=1`
      })
    }
    
  },

  //转换返回的json字符串数据
  transformImgUrls(arr) {
    if(arr.length>0){
      for (let i = (arr.length - 1); i >= 0; i--) {
        arr[i].imgList = JSON.parse(arr[i].imgList)
        arr[i].startTime = util.relativeDate(arr[i].startTime)
      }
    }
    return arr;
  },

  //初始化页面
  initPage(){
    let _this = this;
    //获取广告数据
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

    //获取即时拍场
    action.getJSLive()
      .then(res => {
        let items = [...res.data.items]
        // console.log(items)
        _this.setData({
          jsLive: _this.transformImgUrls(items)
        })
      })

    //获取直播拍场
    action.getJXLive()
      .then(res => {
        let items = [...res.data.items]
        // console.log(items)
        _this.setData({
          jxLive: _this.transformImgUrls(items)
        })
      })
  },

  //初始获取商户拍品
  getMerchantAuctionList(){
    action.getMerchantAuctionList({
      page: this.data.page,
      limit: 10
    }).then(res=>{
      if (!res.data.list.length) {
        this.setData({
          loadover: true
        })
      } else {
        this.setData({
          merchantList: res.data.list
        })
      }
    })
  }

})
