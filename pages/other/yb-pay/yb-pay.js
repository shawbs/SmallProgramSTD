// pages/yb-pay.js

const app = getApp()

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay: null,
    entrys: null,
    payNo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let payNo = options.payNo;
    this.setData({
      payNo: payNo
    })
    this.initPage(payNo)
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


  //初始化页面
  initPage(payNo){
    action.getPayInfo(payNo).then(res=>{
      let entrys = res.data.entrys;
      let paymentStatus = res.data.paymentStatus;
      //如果订单状态不是正常，否跳转首页
      if (paymentStatus === 0){
          this.setData({
            pay: res.data
          })

          for (let i of entrys) {
            if (i.paymentType == 'pay_by_recreation') {
              this.setData({
                pay: res.data,
                entrys: i
              })
            }
          }
          
      }else{

        // wx.switchTab({
        //   url: '/pages/tabBar/index/index',
        // })

        
      } 
      
    })
  },

  //提交支付动作
  postIntegralPay(){
    let payNo = this.data.payNo;
    action.postIntegralPay({
      paymentToken: this.data.entrys.paymentToken
    }).then(res=>{

        wx.showToast({
          title: '支付成功'
        })

        setTimeout(function(){
          wx.navigateBack({
            delta: 2
          })
        },1000)

    })
  }
})