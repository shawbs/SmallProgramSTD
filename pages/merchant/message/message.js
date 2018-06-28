// pages/merchant/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],

    //滑动删除
    startX: 0,
    deleteWidth: 90
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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


  slideS(e) {
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },

  slideM(e) {
    let sx = this.data.startX;
    let cx = e.touches[0].clientX;
    let dist = sx - cx;
    let left = 0;
    let status = Math.abs(Number(e.currentTarget.dataset.status));
    let deleteWidth = this.data.deleteWidth;
    // 开
    if (dist > 0) {
      //如果已经打开了则还能拉20PX
      if (status >= deleteWidth) {
        left = dist < 10 ? '-' + (deleteWidth + dist) : '-' + (deleteWidth + 10)
      } else {
        left = dist < deleteWidth + 20 ? '-' + dist : '-' + (deleteWidth + 20)
      }
    } else {
      //关
      left = Math.abs(dist) < deleteWidth ? (-deleteWidth + Math.abs(dist)) : 0;
    }

    //获取被滑动项，然后定义其样式位置
    let index = e.currentTarget.dataset.index;
    let list = this.data.list;
    list[index].left = left
    this.setData({
      list: list
    })

  },

  slideE(e) {
    let sx = this.data.startX;
    let ex = e.changedTouches[0].clientX;
    let left = 0;
    if (sx - ex >= (this.data.deleteWidth / 2)) {
      left = '-' + this.data.deleteWidth
    } else {
      left = 0
    }

    let index = e.currentTarget.dataset.index;
    let list = this.data.list;
    list[index].left = left
    this.setData({
      list: list
    })
  }
})