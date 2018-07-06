//index.js
//获取应用实例
const app = getApp()

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
const base = require('../../../utils/base.js')
Page({
  data: {
    bannerH: '150',
    //
    banner: null,
    jsLive: null,
    jxLive: null,
    zpLive: null,

    //下拉加载
    page: 1,
    loadover: false,
    loading: false,
    msg: '',

    //商户拍品
    merchantList: [],
    //限时拍品
    goodlist: [],

    //签到
    tip: '',
    tipstatus: '',
    tipshow: false,

    //首页所有数据
    auction: null,
    directAuction: null,
    list: []
  },
  //事件处理函数
  bindViewTap: function() {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPage();
    this.checkIn();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      bannerH: Math.floor(wx.getSystemInfoSync().screenWidth * 0.4)
    })
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
    
    setTimeout(function(){
      wx.stopPullDownRefresh()
    },2000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.loading || this.data.loadover) return
    let page = ++this.data.page;
    this.setData({
      loading: true,
      msg: app.globalData.msgLoading
    })
    action.indexList({
      page: page,
      limit: 10
    }, false).then(res => {
      let data = { ...res.data }
      this.setData({
        page: page,
        loading: false,
        list: [...this.data.list, ...data.auction.timeAuctionItems.entries]
      })
      if (page == data.auction.timeAuctionItems.totalPage){
        this.setData({
          loadover: true,
          msg: app.globalData.msgLoadOver
        })
      }
    })
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
    //获取广告数据
    action.getBanner()
      .then(res => {
        this.setData({
          banner: res.data.dtolist
        })
      })

    // //获取即时拍场
    // action.getJSLive()
    //   .then(res => {
    //     let items = [...res.data.items]
    //     // console.log(items)
    //     this.setData({
    //       jsLive: this.transformImgUrls(items)
    //     })
    //   })

    // //获取直播拍场
    // action.getJXLive()
    // .then(res => {
    //   let items = [...res.data.items]
    //   // console.log(items)
    //   this.setData({
    //     jxLive: this.transformImgUrls(items)
    //   })
    // })
    //获取商户入驻首页拍品
    // this.getMerchantAuctionList();

    //获取首页数据
    this.getIndexList();
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
  },

  //签到
  checkIn(){
    if (!base.checkLogin()) return
    let that = this;
    action.checkIn().then(res=>{
      if (!res.data.isChecked) return
      that.setData({
        tipshow: true,
        tip: res.data.describ,
        tipstatus: 'success'
      })

      setTimeout(function(){
        that.setData({
          tipshow: false,
        })
      },3000)
    })
  },

  //获取限时拍品列表
  getList(){
    action.getListInfo({
      cateId: 0,
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
  },

  //获取首页数据
  getIndexList(){
    this.setData({
      page: 1,
      loadover: false,
      msg: ''
    })
    action.indexList({
      page: this.data.page,
      limit: 10
    },true).then(res=>{
      let data = {...res.data}
      this.transformImgUrls(data.auction.directAuction.items)
      this.setData({
        auction: data.auction,
        directAuction: data.auction.directAuction,
        list: data.auction.timeAuctionItems.entries
      })
    })
  }
})
