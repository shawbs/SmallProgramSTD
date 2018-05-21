//app.js
const conf = require('config.js')
const util = require('./utils/util.js')
App({

  //当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch: function () {

    this.globalData.user = wx.getStorageSync('__User') || null;

  },

  //当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow(option){
    //当进入小程序时检测到url中有inviterToken，则认为是从推广连接进入，把它存入缓存，方便注册时使用其作为推荐人
    let inviterToken = option.query.inviterToken;
    if (inviterToken){
      wx.setStorageSync('inviterToken', inviterToken)
    }

    util.autoCelarStorage();
  },

  //当小程序从前台进入后台，会触发 onHide
  onHide(){
    
  },

  //当小程序出现要打开的页面不存在的情况
  onPageNotFound(){
    wx.switchTab({
      url: '/pages/tabBar/index/index',
    })
  },

  globalData: {
    wxUser: null,//微信用户
    user: null,//std用户
    conf: conf.conf,
    assets: conf.path.assets,
    oldVersion: false
  }
})