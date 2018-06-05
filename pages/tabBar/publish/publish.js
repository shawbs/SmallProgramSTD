// pages/merchant/publish/publish.js
const app = getApp();

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
const base = require('../../../utils/base.js')
const ob = require('../../../utils/observer.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMerchant: 1, // 100时代表未登录
    types: [],
    array: ['不支持','3天无理由退货', '7天无理由退货'],
    endTime: util.formatYear(),
    startTime: util.formatYear(),
    i: 1,
    auctionData: null,
    productTokenString: '',
    previewList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.init();
    let _this = this;
    ob.listen('pushlish_refresh', function (token){
      _this.init();
    })
    
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
    this.init();
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

  init(){
    //如果用户已登录
    if (base.checkLogin()) {
      this.setData({
        isMerchant: app.globalData.isMerchant
      })
      //如果用户是商户
      if (this.data.isMerchant == 2) {
        let token = app.globalData.token;
        if (token) {
          this.getInfo(token);
        } else {
          this.initPage();
        }
      }

    } else {
      this.setData({
        isMerchant: 100
      })
    }

    setTimeout(function(){
      app.globalData.token = '';
    },1000)
  },

  //初始化
  initPage(){
    
    //初始化拍品属性项
    action.initMerchantAuction({}).then(res => {
      let types = [
        {
          label: '名称',
          value: '',
          check: true,
          name: 'productName',
          required: true
        },
        {
          label: '退货',
          value: '',
          check: true,
          name: 'returnType',
          required: true
        },
        {
          label: '介绍',
          value: '',
          check: true,
          name: 'introduction',
          required: true
        },
      ];
      let proMap = res.data.proMap;
      for (let item in proMap){
        let item = {
          label: proMap[item],
          value: '',
          check: true,
          name: item,
          required: false
        }
        types.splice(1, 0, item)
      }
      this.setData({
        types: types,
        productTokenString: res.data.productToken,
        previewList: []
      })
    })
  },

  //如果从草稿点击进入拍品发布，会初始化拍品详情
  getInfo(token){
    action.merchantAuctionInfo({
      productToken: token
    }).then(res=>{
      let types = [
        {
          label: '名称',
          value: '',
          check: true,
          name: 'productName',
          required: true
        },
        {
          label: '退货',
          value: '',
          check: true,
          name: 'returnType',
          required: true
        },
        {
          label: '介绍',
          value: '',
          check: true,
          name: 'introduction',
          required: true
        },
      ];
      let proMap = res.data.proMap;
      let product = res.data.product;
      let properties = product.properties ? JSON.parse(product.properties) : null;
      let accessoryDTOs = res.data.accessoryDTOs;
      for (let item of accessoryDTOs){
        item.url = item.objectUrl
      }
      for (let item in proMap) {
        let item = {
          label: proMap[item],
          value: '',
          name: item,
          check: true,
          required: false
        }
        types.splice(1, 0, item)
      }
      if (properties){
        for (let item in properties){
          product[item] = properties[item]
        }
      }
      // console.log(product)
      this.setData({
        types: types,
        productTokenString: product.productToken,
        auctionData: product,
        previewList: accessoryDTOs
      })

    })
  },

  //
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      i: e.detail.value
    })
  },

  //复选框切换
  checkboxChange(e){
    let index = e.currentTarget.dataset.index;
    let types = this.data.types;
    types[index].check = !types[index].check;
    this.setData({
      types: types
    })
  },

  //新建拍品
  saveAuction(e){
    let parameter = {};
    let properties = {}
    let formdata = e.detail.value;
    for (let item in formdata){
      switch (item){
        case 'productName': parameter.productName = formdata[item];break;
        case 'introduction': parameter.introduction = formdata[item]; break;
        case 'returnType': parameter.returnType = ~~(formdata[item]); break;
        default: properties[item] = formdata[item];
      }
    }
    parameter.properties = JSON.stringify(properties);
    parameter.productTokenString = this.data.productTokenString;
    action.saveMerchantAuction(parameter).then(res=>{
      this.setData({
        productTokenString: res.data.productToken
      })
      // console.log(this.data.productTokenString)
      wx.navigateTo({
        url: `/pages/merchant/push/push?token=${encodeURIComponent(this.data.productTokenString)}`,
      })
    })
  },
  
  //上传拍品图片
  uploadImg(){
    console.log(this.data.types)

    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0]
        that.uploadImge(tempFilePath, 0)
      }
    })
  },

  //上传拍品视频
  uploadVideo() {
    let that = this;
    wx.chooseVideo({
      maxDuration: 15,
      success: function (res) {
        let tempFilePath = res.tempFilePaths
        that.uploadImge(tempFilePath, 1)
      }
    })
  },

  //上传拍品图片和视频 type:0图片 1视频
  uploadImge(filePath,type) {
    action.uploadAuctionImg({
      files: filePath,
      filename: 'file',
      formData: {
        productToken: this.data.productTokenString,
        type: type
      }
    }).then(res => {
      let previewList = this.data.previewList;
      previewList.push({
        url: res.data.url,
        id: res.data.id,
        type: type
      });
      this.setData({
        previewList: previewList
      })

      console.log(this.data.types)
    })
  },

  //删除视频
  deleteImg(e){
    console.log(e);
    let id = e.target.dataset.id;
    let index = e.target.dataset.index;
    action.deleteAuctionImg({
      productToken: this.data.productTokenString,
      accessoryId: id
    }).then(res=>{
      let previewList = this.data.previewList;
      previewList.splice(index,1);
      this.setData({
        previewList: previewList
      })
    })
  }
})