//app.js
const action = require('./api/action.js')
const $ = require('./api/index.js')
const conf = require('config.js')
const base = require('./utils/base.js')
const util = require('./utils/util.js')

App({

  //当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch: function () {

    this.globalData.user = wx.getStorageSync('__User') || null;


    //定义一个定时器,周期性(1小时)刷新token和商户token
    refreshTimer(this);
  },

  //当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow(option){
    //当进入小程序时检测到url中有inviterToken，则认为是从推广连接进入，把它存入缓存，方便注册时使用其作为推荐人
    let inviterToken = option.query.inviterToken;
    if (inviterToken){
      wx.setStorageSync('inviterToken', inviterToken)
    }
       
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
    oldVersion: false,
    token: '', //临时token,

     //是否商户 1不是，2是
    isMerchant: 1,

    //支付类型 0默认(用户) 1用户提现 2商户提现
    payType: 0, 

    //刷新商户申请状态
    getMerchantApplyStatus(cb) { 
      action.getMerchantApplyStatus().then(res => {
        let merchantApplyStatus = {...res.data};
        wx.setStorageSync('merchantApplyStatus', merchantApplyStatus);
        if (merchantApplyStatus.checkStatus == 2) {
          this.isMerchant = 2;
        } else {
          this.isMerchant = 1
        }
        cb && cb(merchantApplyStatus)
      })
    },

    //资讯视频详情
    videoInfo: null
  }
})

//刷新token和商户token
function refreshTimer(app, hour=1){

  //如果用户登录了，会进行以下操作
  if (base.checkLogin()) {

    /*
    *每当小程序进入前台显示时,重新获取商户token,防止已过期的token请求商户接口造成多次请求错误
    *(商户token请求接口 <=> 过期商户token <=> 刷新商户token <=> accesstoken过期 <=> 刷新accesstoken)
    *当出现并发请求时,这个问题将更加复杂
    */
    $.refreshToken().then(() => {
      console.log('已更新access_token和refresh_access_token')

      //查看用户是否成为商户的状态
      action.getMerchantApplyStatus().then(res => {
        if (res.data.checkStatus == 2) {
          app.globalData.isMerchant = 2
        } else {
          app.globalData.isMerchant = 1
        }

        if (app.globalData.isMerchant == 2) {
          console.log('你是商户，正在请求商户token和商户refreshtoken')
          action.merchantToken().then((res) => {
            wx.setStorageSync('__refreshMerchantToken', res.data.refreshMerchantToken)
            wx.setStorageSync('__merchantToken', res.data.merchantToken)
            console.log('已更新merchant_token和refresh_merchant_token')
          })
        } else {
          console.warn('不是商户')
        }

      })

    })

  } else {
    console.log('未登录')
  }


  setTimeout(function(){
    refreshTimer(app, hour)
  }, hour * 60*60*1000);
}