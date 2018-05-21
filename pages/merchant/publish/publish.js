// pages/merchant/publish/publish.js
const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      {
        value: '名称',
        check: true,
        required: true
      },
      {
        value: '年代',
        check: true,
        required: false
      },
      {
        value: '款识',
        check: true,
        required: false
      },
      {
        value: '规格',
        check: true,
        required: false
      },
      {
        value: '重量',
        check: true,
        required: false
      },
      {
        value: '品相',
        check: true,
        required: false
      },
      {
        value: '职称',
        check: true,
        required: false
      },
      {
        value: '材质',
        check: true,
        required: false
      },
      {
        value: '退货',
        check: true,
        required: false
      }
    ],
    array: ['不支持','3天无理由退货', '7天无理由退货'],
    index: 0,
    checked: true,
    endTime: util.formatYear(),
    startTime: util.formatYear(),
    step: 1,
    baseData: null,
    settingData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.types[0].check)
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

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  checkboxChange(e){
    let index = e.currentTarget.dataset.index;
    let types = this.data.types;
    types[index].check = !types[index].check;
    this.setData({
      types: types
    })
  },

  bindDateChange1(e){
    this.setData({
      endTime: e.detail.value
    })
  },

  bindDateChange2(e) {
    this.setData({
      startTime: e.detail.value
    })
  },

  submitForm(e){
    this.setData({
      baseData: e.detail.value,
      step: 2
    })
  },

  settingForm(e){
    this.setData({
      settingData: e.detail.value
    })
    console.log(this.data.baseData, this.data.settingData)
  }
})