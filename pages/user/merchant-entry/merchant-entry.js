// pages/user/merchant-entry/merchant-entry.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantApplyStatus: null,
    identificationInfo: null
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  initPage(){
    //获取商户状态
    let merchantApplyStatus = wx.getStorageSync('merchantApplyStatus');
    this.setData({
      merchantApplyStatus: merchantApplyStatus
    })
    //如果不是商户，则获取实名状态，如果实名通过，则显示申请成为商户的按钮，没有通过则跳转申请入口页面
    if (!merchantApplyStatus.isexist) {
      this.getIdentificationStatus(()=>{
        let identificationInfo = this.data.identificationInfo;
        console.log(identificationInfo)
      })
    }


  },


  //获取实名认证申请状态信息，保存到缓存中
  getIdentificationStatus(cb) {
    let identificationInfo = {};
    identificationInfo.status = 0;
    action.getIdentificationStatus().then(res => {
      let isexist = res.data.isexist;
      if (isexist) {
        let arr = res.data.certifyEntity;
        for (let item of arr) {
          if (item.certifyType == 1) {
            identificationInfo.personal = item
          }
          if (item.certifyType == 0) {
            identificationInfo.enterprise = item
          }
          if (item.checkStatus == 2){
            identificationInfo.status = 1
          }
        }
        if (Object.keys(identificationInfo).length > 1){
          identificationInfo.status = 2
        }
        wx.setStorageSync('identificationInfo', identificationInfo);
        this.setData({
          identificationInfo: identificationInfo
        })
      }

      cb && cb();
    })
  },

  applyMerchant(e){
    let type = e.currentTarget.dataset.type;
    this.merchantApply(type)
  },


  //申请商户
  merchantApply(type) {
    if (type == 1) {
      this.getPersonalToken(token=>{
        action.merchantApply({
          personalCertifyToken: token
        }).then(res => {
          console.log('已提交个人商户申请')
        })
      })
    }
    if (type == 2) {
      this.getEnterpriseToken(token=>{
        action.merchantApply({
          enterpriseCertifyToken: token
        }).then(res => {
          console.log('已提交企业商户申请')
        })
      })
    }
  },

  //获取个认证token
  getPersonalToken(cb) {
    console.log('获取个人认证token')
    action.personalToken().then(res => {
      cb && cb(res.data.personalCertifyToken)
    })
  },

  //获取个认证token
  getEnterpriseToken(cb) {
    console.log('获取企业认证token')
    action.enterpriseToken().then(res => {
      cb && cb(res.data.enterpriseCertifyToken)
    })
  }
})