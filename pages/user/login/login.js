// pages/user/login.js
const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    agreeChecked: true,
    step: 1,
    timer: 60,
    phone:'',
    smstoken: '',
    // code1:'',
    // code2: '',
    // code3: '',
    // code4: '',
    inviterToken: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone: wx.getStorageSync('tel') || ''
    })

    let inviterToken = wx.getStorageSync('inviterToken');
    if (inviterToken) {
      this.setData({
        inviterToken: inviterToken
      })
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
  onShow: function (option) {

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


  toggleAgreeCheck(e){
    console.log(e)
    this.setData({
      agreeChecked: !this.data.agreeChecked
    })
  },

  countdown(){
    let _this = this;
    let timer = this.data.timer - 1;
    if (timer >=0){
      setTimeout(function () {
        _this.setData({
          timer: timer
        })
        _this.countdown();
      }, 1000)
    }
  },

  getPhone(e){
    let phone = e.detail.value;
    this.setData({
      phone: phone
    }) 
  },

  sendPhone() {
    if (!this.data.agreeChecked)return

    let phone = this.data.phone;
    if (/^\d{11}$/.test(phone)) {
      action.getCode(phone).then(res=>{
        this.setData({
          timer: 60,
          step: 2,
          smstoken: res.data.smstoken
        })

        this.countdown();
      })

    }else{
      wx.showToast({
        title: '输入的手机号码错误',
        icon: 'none',
        duration: 2000
      })
    }
  },

  putCode(e){
    let target = e.target;
    let step = Number(target.dataset.step) + 1;
    if (!e.detail.value){return}
    this.setData({
      step: step
    })
    switch (target.dataset.code){
      case '1': this.setData({ code1: e.detail.value}); break;
      case '2': this.setData({ code2: e.detail.value }); break;
      case '3': this.setData({ code3: e.detail.value }); break;
      case '4': this.setData({ code4: e.detail.value }); break;
      default: 
    }
  },
  postSend(e){
    let value = e.detail.value;
    if(Number(value) && value.length >= 4){
      this.submitLogin(value)
    }
  },

  submitLogin(code){
    let parameter = {
      name: this.data.phone,
      code: code,
      smsToken: this.data.smstoken
    }
    if (this.data.inviterToken){
      parameter.inviteToken = this.data.inviterToken
    }
    for(let o in parameter){
      if (!parameter[o]){
        wx.showToast({
          title: '参数错误',
          icon: 'none',
          duration: 1000
        })
        return
      }
    }

    this.loginAction(parameter);
   
  },

  //登录动作
  loginAction(parameter){
    action.login(parameter).then(res => {
      let data = res.data;
      let user = {
        userId: data.userId,
        name: data.name,
        userName: data.userName,
        realName: data.realName,
        idCardNo: data.idCardNo,
        typeId: data.typeId,
        group: data.group,
        gender: data.gender,
        headImgUrl: data.headImgUrl,
        inviterToken: data.inviterToken,
        typeName: data.typeName,
        isFirst: data.isFirst,
        issuedTime: data.issuedTime
      }
      try {
        wx.setStorageSync('__refreshToken', data.refreshToken)
        wx.setStorageSync('__accessToken', data.accessToken)
        wx.setStorageSync('__User', user)
        wx.setStorageSync('__inviterToken', data.inviterToken)
        wx.setStorageSync('tel', user.name)

        //检测用户不否商户,2是 1不是
        action.getMerchantApplyStatus().then(res => {
          if (res.data.checkStatus == 2) {
            app.globalData.isMerchant = 2;
            action.merchantToken().then((res) => {
              wx.setStorageSync('__refreshMerchantToken', res.data.refreshMerchantToken)
              wx.setStorageSync('__merchantToken', res.data.merchantToken)
              console.log('已更新merchant_token和refresh_merchant_token')
            })
          } else {
            app.globalData.isMerchant = 1
          }
        })

        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../../tabBar/index/index'
          })
        }, 1000)
      } catch (e) {
        console.error(e)
      }
    })
  }
})