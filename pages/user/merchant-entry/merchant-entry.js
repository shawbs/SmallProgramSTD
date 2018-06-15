// pages/user/merchant-entry/merchant-entry.js
const app = getApp();
const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
const ob = require('../../../utils/observer.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantApplyStatus: null,
    identificationInfo: null,
    status: 0 // 1商户待审核 2商户待激活 3商户申请通过
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

    //未实名认证或未通过实名认证
    if (!merchantApplyStatus.isexist) {
      this.getIdentificationStatus()
    }else{
      console.log(merchantApplyStatus)
      //商户待审核
      if (merchantApplyStatus.checkStatus == 1) {
        this.setData({
          status: 1
        })
      }

      //商户待激活
      if (merchantApplyStatus.checkStatus == 0) {
        this.setData({
          status: 2
        })
        this.getIdentificationStatus()
      }

      //商户申请通过
      if (merchantApplyStatus.checkStatus == 2) {
        this.setData({
          status: 3
        })
      }  
    }

    


  },


  //获取实名认证申请状态信息，保存到缓存中
  getIdentificationStatus(cb) {
    let identificationInfo = {};
    let isChecked = false;
    action.getIdentificationStatus().then(res => {
      let isexist = res.data.isexist;
      if (isexist) {
        let arr = res.data.certifyEntity;
        for (let item of arr) {
          if (item.certifyType == 0) {
            identificationInfo.personal = item
          }
          if (item.certifyType == 1) {
            identificationInfo.enterprise = item
          }
          if (item.checkStatus == 2){
            isChecked = true;
          }
        }
        wx.setStorageSync('identificationInfo', identificationInfo);
        this.setData({
          identificationInfo: identificationInfo
        })
      }

      cb && cb(isChecked);
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
          wx.showToast({
            title: '提交成功',
          })
        })
      })
    }
    if (type == 2) {
      this.getEnterpriseToken(token=>{
        action.merchantApply({
          enterpriseCertifyToken: token
        }).then(res => {
          console.log('已提交企业商户申请')
          wx.showToast({
            title: '提交成功',
          })
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