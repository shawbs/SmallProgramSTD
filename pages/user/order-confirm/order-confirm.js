// pages/order-confirm/order-confirm.js
const app = getApp()

const action = require('../../../api/action.js')
const util = require('../../../utils/util.js')
const ob = require('../../../utils/observer.js')

//全局发票费用变量
let InvoiceFee = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    payway: null,
    info: null,
    address: null,
    orderNo: '',
    token: '',
    step: 1,
    //付款配置
    entrys: [{
      type: 0,
      checked: true
    }],

    //物流
    expressTypes: {
      1: true,//快递
      2: false,//自取
      3: false, //寄存
    },
    //增值费用项
    extraFeeList: [],
    //增值费用
    extraFee: 0,
    //发票费用
    invoiceFee: 0, 
    //发票配置项
    invoice: {
      checked: false
    },
    total: 0,

    invoiceToken: '', //发票token
    shipmentToken: '', //配送token
    shippmentSelfToken: '', //自取token
    consignmentToken: '', //寄存token
    extraFeeToken: '', //增值token

    idArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      token: options.token || '',
      orderNo: options.orderNo || '',
      step: options.step || 1
    })
    this.initPage()
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
    this.getDefaultAddress();
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



  //改变当前的总价格
  changeTotal(){
    let total = (this.data.info.actualPrice / 100) + (this.data.invoiceFee / 100) + (this.data.extraFee / 100);
    this.setData({
      total: total.toFixed(1)
    })
  },

  //初始化
  initPage(){
    //寄存token
    this.getConsignmentToken();

    //配置详情
    this.getOrderInfo(()=>{
      this.changeTotal();
      //默认地址
      this.getDefaultAddress();
     
    })

    //付款配置
    this.getPayway();

    //获取发票token
    ob.on('get_invoice', (invoice)=>{
      console.log(invoice)
      InvoiceFee = invoice.fee;
      this.setData({
        invoiceToken: invoice.invoiceToken,
        invoiceFee: invoice.fee
      })
      
      //发票返回默认发票为选中
      let _invoice = this.data.invoice;
      _invoice.checked = true;
      this.setData({
        invoice: _invoice
      })
      //计算发票费用
      if (!this.data.invoice.checked) {
        this.setData({
          invoiceFee: 0
        })
      } else {
        this.setData({
          invoiceFee: InvoiceFee
        })
      }
      this.changeTotal();
    })


  },

  //获取订单配置
  getOrderInfo(cb){
    action.getOrderPayway({
      orderToken: this.data.token
    }).then(res => {
      let info = {...res.data};
      info.imgUrl = JSON.parse(info.imgUrl);
      this.setData({
        status: info.orderStatus,
        info: info,
        address: info.address,
        shippmentSelfToken: info.shippmentSelfToken, //自取token
        extraFeeList: info.extraFeeList,
        extraFeeToken: info.extraFeeToken, //增值费用token
      })

      if (this.data.status == 10){
        this.setData({
          step: 1
        })
      }

      if (this.data.status>12){
        wx.showToast({
          title: '订单已经配置',
          icon: 'none'
        })
      }

      cb && cb();
    })
  },
  //订单付款配置
  getPayway(){
    action.getPayway({
      orderNo: this.data.orderNo
    }).then(res=>{
      let payway = {...res.data};
      let entrys =  [];
      for (let i = 0; i < payway.entrys.length; i++) {
        entrys[i] = payway.entrys[i];
        if(i == 0){
          entrys[i].checked = true
        }else{
          entrys[i].checked = false
        }
      }
      this.setData({
        payway: payway,
        entrys: entrys
      })
    })
  },

  //获取默认地址
  getDefaultAddress(){
    let address = wx.getStorageSync('selected_address');
    if (!address && !this.data.address){
      action.getDefaultAddress().then(res=>{
        this.setData({
          address: res.data
        })
      })
    }else{
      this.setData({
        address: address
      })
    }
  },

  //切换支付配置
  toggle(e){
    let value = e.detail.value;
    let entrys = this.data.entrys;
    console.log(entrys)
    for (let i=0; i<entrys.length;i++){
      entrys[i].checked = false;
    }
    entrys[value].checked = true
    this.setData({
      entrys: entrys
    })

  },

  //提交付款配置项,如果是全款则进入第二步配置,如果是分期,则跳转支付定金
  nextPost(e){
    let payType = e.detail.value.payType;
    if (this.data.status == 10){
      this.createPayNo({
        orderToken: this.data.token
      })
    }else{  
      action.postOrderPayway({
        paymentType: payType,
        orderNo: this.data.orderNo
      }).then(res=>{
        if (payType == 1){
          this.createPayNo({
            orderToken: this.data.token
          })
        }else{
          this.setData({
            step: 2
          })
        }
      })
    }

  },

  //修改增值费用
  changeExtrafee(e){
    let idArr = e.detail.value;
    this.setData({
      idArr: idArr
    })
    this.getExtraFeeToken();
  },

  //切换增值费用效果
  toggleExtrafee(e){
    let index = e.currentTarget.dataset.index;
    let fee = e.currentTarget.dataset.fee;
    let extraFeeList = this.data.extraFeeList;
    extraFeeList[index].isConstraint = !extraFeeList[index].isConstraint;
    this.setData({
      extraFeeList: extraFeeList
    })
    //计算增值费用
    let extraFee = this.data.extraFee;
    //如果选中则加,取消则减
    if (extraFeeList[index].isConstraint ){
      extraFee = extraFee + fee;
    }else{
      extraFee = extraFee - fee < 0 ? 0 : extraFee - fee;
    }
    this.setData({
      extraFee: extraFee
    })
    this.changeTotal();
  },

  //修改发票项
  changeInvoice(){
    //如果当前没有生成发票token,,则前往申请,
    if (!this.data.invoiceToken) {
      this.linkInvoice();
      return
    }
    
    let invoice = this.data.invoice;
    invoice.checked = !invoice.checked;
    this.setData({
      invoice: invoice
    })
    
    //计算发票费用
    if (!this.data.invoice.checked){
      this.setData({
        invoiceFee: 0
      })
    }else{
      this.setData({
        invoiceFee: InvoiceFee
      })
    }
    this.changeTotal();
  },

  // 切换快递
  toggleExpress(e){
    console.log(e)
    let value = e.detail.value;
    let types = this.data.expressTypes;
    for (let i in types) {
      types[i] = false;
    }
    types[value] = true;
    this.setData({
      expressTypes: types
    })
  },

  //前往发票
  linkInvoice(){
    let orderToken = encodeURIComponent(this.data.token);
    wx.navigateTo({
      url: `/pages/user/invoice/invoice?orderToken=${orderToken}`,
    })
  },

  //提交订单(全款或尾款)
  postStoreOrader(e) {
    let formdata = e.detail.value;
    console.log(formdata)
    let invoiceToken = formdata.invoice ? this.data.invoiceToken : '';
    let extraFeeToken = formdata.extraFee.length > 0 ?　this.data.extraFeeToken : '';

    let token = '';
    switch (formdata.express){
      //自取
      case '2': 
        token = this.data.shippmentSelfToken; 
        console.log('自取', token)
        this.createPayNo(
          {
            shipmentToken: token,
            invoiceToken: invoiceToken,
            orderToken: this.data.token,
            extraFeeToken: extraFeeToken,
            // vocherToken: ''
          }
        );
        break;
      //寄存
      case '3': 
        token = this.data.consignmentToken; 
        console.log('寄存', token)
        this.createPayNo(
          {
            shipmentToken: token,
            invoiceToken: invoiceToken,
            orderToken: this.data.token,
            extraFeeToken: extraFeeToken,
            // vocherToken: ''
          }
        );
        break;
      //快递
      default: 
        this.getShipmentToken(() => {
          console.log('快递', this.data.shipmentToken)
          this.createPayNo(
            {
              shipmentToken: this.data.shipmentToken,
              invoiceToken: invoiceToken,
              orderToken: this.data.token,
              extraFeeToken: extraFeeToken,
              // vocherToken: ''
            }
          )
        })
    }
  },

  //确认订单生成支付单号
  createPayNo(parameter={}){
    action.postOrderConfig(parameter).then(res => {
      wx.navigateTo({
        url: `/pages/user/pay/pay?paymentNo=${res.data.paymentNo}`
      })
    })
  },

  //获取配送token
  getShipmentToken(cb){
    console.log(this.data.address)
    let address = this.data.address;
    if(!address){
      wx.showToast({
        title: '收货地址不能为空',
      })
    } 
    action.getDeliveryToken({
      orderToken: this.data.token,
      isInsure: 0,
      address: address.province + address.city + address.area + address.street,
      consignee: address.consignee,
      zipCode: address.zipCode,
      telephone: address.telephone
    }).then(res=>{
      this.setData({
        shipmentToken: res.data.extraToken
      })
      cb && cb(res.data.extraToken)
    })
  },

  //获取寄存token
  getConsignmentToken(){
    action.getConsignmentToken({
      orderToken: this.data.token
    }).then(res=>{
      this.setData({
        consignmentToken: res.data.extraToken
      })
    })
  },
  //更新增值费用token
  getExtraFeeToken(){
    action.getExtraFeeToken({
      jsonIdList: JSON.stringify(this.data.idArr),
      orderToken: this.data.token
    }).then(res=>{
      this.setData({
        extraFeeToken: res.data.extraFeeToken
      })
    })
  }

})