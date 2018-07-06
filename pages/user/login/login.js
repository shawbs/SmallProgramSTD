// pages/user/login.js
const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
const ob = require('../../../utils/observer.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1, //登录1 注册2
    step: 1, //登录的步骤1,2
    phone:'',
    smstoken: '',
    inviterToken: '',

    timer: 60,
    sendCodeDis: true,

    newTel: '',
    inviterCode: ''
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

  //倒计时
  countdown(){
    let self = this;
    let timer = --this.data.timer;
    this.setData({
      timer: timer,
      sendCodeDis: true
    })
    if(timer == 0){
      this.setData({
        sendCodeDis: false
      })
    }
    if (timer >0){
      setTimeout(function () {
        self.countdown();
      }, 1000)
    }
  },

  //更新手机号
  getPhone(e){
    let phone = e.detail.value;
    this.setData({
      phone: phone
    }) 
  },

  //登录发送验证码
  sendPhone() {
    let phone = this.data.phone;
    if (/^\d{11}$/.test(phone)) {
      action.getCode(phone).then(res=>{
        wx.showToast({
          title: '发送成功',
        });

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

  //注册发送验证码
  sendPhone2() {
    let phone = this.data.newTel;
    if (/^\d{11}$/.test(phone)) {
      action.getCode(phone).then(res => {
        wx.showToast({
          title: '发送成功',
        });

        this.setData({
          timer: 60,
          smstoken: res.data.smstoken
        })

        this.countdown();
      })

    } else {
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

  //登录，未注册的用户会自动注册
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

        ob.emit('refresh_userinfo');
      } catch (e) {
        console.error(e)
      }
    })
  },

  //切换登录注册
  toggleType(e){
    let type = e.target.dataset.type;
    this.setData({
      type: type,
      smstoken: ''
    })
  },

  connectTel() {
    let arr = ['0592-5220601']
    wx.showActionSheet({
      itemList: arr,
      success: function (res) {
        wx.makePhoneCall({
          phoneNumber: arr[res.tapIndex]
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  changeNewTel(e){
    this.setData({
      newTel: e.detail.value,
    })
    this.checkInput();
  },

  changeInviterCode(e) {
    let inviterCode = e.detail.value
    if (inviterCode.length >= 6){
      this.checkInviterCode(inviterCode, (status)=>{
        if (status){
          this.setData({
            inviterCode: inviterCode
          })
        }else{
          this.setData({
            inviterCode: ''
          })
        }
        this.checkInput()
      })
    }else{
      this.setData({
        inviterCode: ''
      })
      this.checkInput()
    }
  },

  //检测邀请码
  checkInviterCode(inviterCode, cb){
    action.checkInviterCode({
      inviterCode: inviterCode
    }).then(res=>{
      cb && cb(res.data.isSuccess)
    })
  },

  checkInput(){
    if (!!this.data.newTel && !!this.data.inviterCode) {
      this.setData({
        sendCodeDis: false
      })
    } else {
      this.setData({
        sendCodeDis: true
      })
    }
  },

  //注册
  register(e) {
    let formdata = e.detail.value;
    let parameter = Object.assign(formdata,{
      deviceId: wx.getSystemInfoSync().model,
      smsString: this.data.smstoken
    })
    if (this.data.inviterToken) {
      parameter.inviteToken = this.data.inviterToken
    }
    console.log(parameter)
    action.register(parameter).then(res=>{
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
        title: '注册成功',
        icon: 'success',
        duration: 1000
      })
      setTimeout(function () {
        wx.switchTab({
          url: '../../tabBar/index/index'
        })
      }, 1000)

      ob.emit('refresh_userinfo');

    })
  },

})