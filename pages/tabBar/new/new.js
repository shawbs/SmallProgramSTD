// pages/tabBar/new/new.js
const app = getApp()

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')

let PAGE = 1
let LOADOVER = false
let loading = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    dopraise: false,
    navlist: [{ cateId: 1, cateName: '文章' }, { cateId: 2, cateName: '视频'}],
    type: 2,
    scrollH: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.type == 1) {
      this.initPage();
    }

    if (this.data.type == 2) {
      this.initPage2();
    }
    
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
    if (LOADOVER && !loading) {
      return
    }
    loading = true
    if(this.data.type==1){
      action.getNewList({
        pageNumber: ++PAGE
      }).then(res => {
        setTimeout(function () {
          loading = false;
        }, 500)
        if (res.data.articlelist.length > 0) {
          let articlelist = res.data.articlelist;
          for (let item of articlelist) {
            item.createTime = util.formatTime(item.createTime)
          }
          this.setData({
            list: this.data.list.concat(articlelist)
          })
        } else {
          LOADOVER = true;
        }
      })
    }
    if(this.data.type==2){
      action.getVideoList({
        page: ++PAGE,
        limit: 10,
        deviceId: wx.getSystemInfoSync().model
      }).then(res => {
        setTimeout(function () {
          loading = false;
        }, 500)
        if (res.data.dtolist.length > 0) {
          let dtolist = res.data.dtolist;
          for (let item of dtolist) {
            item.introduction = util.format(item.introduction, 12)
          }
          this.setData({
            list: dtolist
          })
        } else {
          LOADOVER = true;
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //初始文章
  initPage(){
    action.getNewList({
      pageNumber: PAGE
    }).then(res=>{
      let articlelist = res.data.articlelist;
      for (let item of articlelist){
        item.createTime = util.formatTime(item.createTime)
      }
      this.setData({
        list: this.data.list.concat(articlelist)
      })
    })
  },

  //初始视频
  initPage2() {
    action.getVideoList({
      page: 1,
      limit: 10,
      deviceId: wx.getSystemInfoSync().model
    }).then(res => {
      let dtolist = res.data.dtolist;
      for (let item of dtolist){
        item.introduction = util.format(item.introduction,12)
      }
      this.setData({
        list: dtolist
      })
    })
  },

  //点赞
  dopraise(e){
    let target = e.target;
    //如果没有点赞过
    if (!target.dataset.praise){
      action.dopraise({
        articleId: target.dataset.id,
        deviceId: wx.getSystemInfoSync().model
      }).then(res => {
        let list = this.data.list;
        list[target.dataset.index].praiseBefore = true;
        list[target.dataset.index].praise += 1;
        this.setData({
          list: list
        })
      })
    }
    
  },

  navtab(e){
    let id = e.detail.id;
    PAGE = 1;
    LOADOVER = false;
    if(id == 1){
      this.setData({
        type: 1,
        list: []
      })
      this.initPage()
    }
    if(id == 2){
      this.setData({
        type: 2,
        list: []
      })
      this.initPage2();
    }
  },

  //隐藏封面图片，显示，播放视频，
  playVideo(e){
    // console.log(e);
    let target = e.currentTarget;
    let index = target.dataset.index;
    let list = this.data.list;
    list[index].play = true;
    this.setData({
      list: list
    })
    wx.createVideoContext(`myVideo${index}`).play();
  },

  //暂停，隐藏视频,显示封面
  pauseVideo(e){
    let target = e.currentTarget;
    let index = target.dataset.index;
    let list = this.data.list;

    wx.createVideoContext(`myVideo${index}`).pause();
    
    list[index].play = false;
    this.setData({
      list: list
    })    
  },

  //前往资讯详情
  linkInfo(e){  
    let url = encodeURIComponent(e.currentTarget.dataset.url);
    console.log(url)
    wx.navigateTo({
      url: `/pages/other/new-detail/new-detail?url=${url}`,
    })
  }
})