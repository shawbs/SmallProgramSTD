// pages/address/address.js
const app = getApp();
const action = require('../../../api/action.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1, //默认1，2来自地址选择
    addressList: [],

    //滑动删除
    startX: 0,
    deleteWidth: 90
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type || 1
    })
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
    this.initPage();
    setTimeout(function(){
      wx.stopPullDownRefresh();
    },1000)
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
    action.getAddressList({
      pageNumber: 1,
      pageSize: 10
    }).then(res=>{
      this.setData({
        addressList: res.data.list
      })
    })
  },

  //删除地址
  deleteAddress(e){
    let target = e.target;
    action.deleteAddress({
      addressId: target.dataset.id
    }).then(res=>{
      wx.showToast({
        title: '删除成功'
      })
      this.initPage();
    })
  },

  //点击地址项，如果this.data.type为1则跳转编辑，2跳转地址上一个页面
  linkAddressEdit(e){
    let target = e.currentTarget;
    if(this.data.type == 1){
      let status = target.dataset.status ? target.dataset.status : null;
      let url = target.dataset.url;
      if (!status) {
        wx.navigateTo({
          url: url,
        })
      }
    }else{
      let index = target.dataset.index;
      // console.log(this.data.addressList[index]);
      //把当前选中的地址缓存起来
      wx.setStorageSync('selected_address', this.data.addressList[index]);
      wx.navigateBack();
    }
  },

  //滑动开始
  slideS(e){
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },

  //滑动中
  slideM(e){
    let sx = this.data.startX;
    let cx = e.touches[0].clientX;
    let dist = sx - cx;
    let left = 0;
    let status = Math.abs(Number(e.currentTarget.dataset.status));
    let deleteWidth = this.data.deleteWidth;
    // 开
    if (dist > 0) {
      //如果已经打开了则还能拉20PX
      if(status >= deleteWidth) {
        left = dist < 10 ? '-' + (deleteWidth+dist) : '-' + (deleteWidth + 10) 
      }else{
        left = dist < deleteWidth+20 ? '-' + dist : '-' + (deleteWidth+20) 
      }
    }else{
      //关
      left = Math.abs(dist) < deleteWidth ? (-deleteWidth + Math.abs(dist)) : 0;
    }

    //获取被滑动项，然后定义其样式位置
    let index = e.currentTarget.dataset.index;
    let addressList = this.data.addressList;
    addressList[index].left = left
    this.setData({
      addressList: addressList
    })

  },

  //滑动结束
  slideE(e){
    let sx = this.data.startX;
    let ex = e.changedTouches[0].clientX;
    let left = 0;
    if (sx - ex >= (this.data.deleteWidth/2)){
      left = '-' + this.data.deleteWidth
    }else{
      left = 0
    }

    let index = e.currentTarget.dataset.index;
    let addressList = this.data.addressList;
    addressList[index].left = left
    this.setData({
      addressList: addressList
    })
  }

})