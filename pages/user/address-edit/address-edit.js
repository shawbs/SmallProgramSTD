// pages/add-edit/address-edit.js
const app = getApp();
const action = require('../../../api/action.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    region: ['北京市', '北京市', '朝阳区'],
    isNew: true,
    addressId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type == 'update'){
      this.setData({
        isNew: false, 
        addressId: options.addressId
      })
      this.initPage(options.adt)
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  switch1Change(e){
    console.log(e)
  },

  //获取地址内容
  initPage(addressToken){
    action.getAddressInfo({
      addressToken: addressToken
    })
    .then(res=>{
      this.setData({
        address: res.data,
        region: [res.data.province, res.data.city, res.data.area]
      })
    })
  },

  submitForm(e){
    if(this.data.isNew){
      this.createAddress(e)
    }else{
      this.updateAddress(e)
    }
  },

  //更新地址
  updateAddress(e) {
    console.log(e)
    let formData = e.detail.value;
    let status = this.verifyForm(formData)
    formData.province = formData.address[0];
    formData.city = formData.address[1];
    formData.area = formData.address[2];
    formData.zipCode = '361000';
    formData.isDefault = formData.isDefault ? 1 : 0;
    formData.addressId = this.data.addressId;
    delete formData.address;

    if (status){
      action.updateAddress(formData).then(res => {
        wx.showToast({
          title: '修改成功',
          icon: 'success'
        })
        setTimeout(function(){
          wx.redirectTo({
            url: '/pages/user/address/address'
          })
        },1000)
      })
    }
    
  },

  //新增地址
  createAddress(e){
    let formData = e.detail.value;
    let status = this.verifyForm(formData)
    formData.province = formData.address[0];
    formData.city = formData.address[1];
    formData.area = formData.address[2];
    formData.zipCode = '361000';
    formData.isDefault = formData.isDefault ? 1 : 0;
    formData.addressId = this.data.addressId;
    delete formData.address;

    if (status) {
      action.createAddress(formData).then(res => {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/user/address/address'
          })
        }, 1000)
      })
    }
  },

  /**
   * 验证表单
   */
  verifyForm(form){
    let falg = true;
    for(let item in form){
      if (item == 'consignee' && !form[item]){
        falg = false;
        this.showTip(this.getInputTitle(item) + '不能为空')
      }

      if (item == 'telephone' && !(/^\d{11}$/.test(form[item])) ) {
        falg = false;
        this.showTip(this.getInputTitle(item) + '错误')
      }

      if (item == 'address' && form[item].length<3) {
        falg = false;
        this.showTip(this.getInputTitle(item) + '错误')
      }

      if (item == 'street' && !form[item]) {
        falg = false;
        this.showTip(this.getInputTitle(item) + '不能为空')
      }
    }
    return falg
  },

  getInputTitle(name){
    let o = {
      consignee: '收货人',
      telephone: '收货人电话',
      address: '省市区地址',
      street: '详细地址'
    }
    return o[name]
  },

  showTip(title){
    wx.showToast({
      title: title,
      icon: 'none'
    })
  }

  
})