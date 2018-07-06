
module.exports = {
  //发送验证码
  getCode: '/service-sms/std/app/sms/vcode',
  //登录
  login: '/business-app-user/std/app/api/v1/app/minapps/login/mobile',
  //注册
  register: '/business-app-user/std/app/api/v1/app/regist/nopwd',
  //校验邀请码
  checkInviterCode: '/business-app-user/std/app/api/v1/app/check/invitercode',
  //刷新token
  refreshToken: '/business-app-user/std/app/api/v1/app/minapps/user/login/refreshToken',
  //签到
  checkIn: '/business-check-in/std/app/api/v1/check',
  //首页
  index: {
    banner: '/business-banner/get/banner/list',
    previewLive: '/web-app-facade/std/app/api/v1/show/mainpage',
    live: '/web-app-facade/std/app/api/v1/mainpage',
    //获取首页所有拍场和拍品列表
    list: '/web-app-facade/std/app/api/v2/all/mainpage'
  },
  //商场换宝列表
  storeListInfo: '/business-treasure-shop/std/app/api/v1/treasure/list',
  //商场换宝类型
  storeCateType: '/business-treasure-shop/std/app/api/v1/treasure/cate/list',
  //商场换宝详情
  storeDetail: '/business-treasure-shop/std/app/api/v1/treasure/detail',
  //商场换宝订单列表
  storeOrderList: '/business-treasure-shop/std/app/api/v1/treasure/orderlist',
  //商场换宝订单详情
  storeOrderDetail: '/business-treasure-shop/std/app/api/v1/treasure/order/detail',
  //商场换宝确认收货
  storeOrderReceive: '/business-treasure-shop/std/app/api/v1/treasure/confirm/receive',
  //商场换宝订单生成
  storePaySure: '/business-treasure-shop/std/app/api/v1/treasure/order',
  //限时拍品列表
  list: '/web-app-facade/std/app/api/v1/show/auction/info',
  //出价记录
  bidList: '/web-app-facade/std/app/api/v1/auction/item',
  //添加围观人数
  addLooker: '/business-app-view/set/app/auction/item/view/info',

  //预展  
  preview: '/web-app-facade/std/app/api/v1/auction/info',
  //出价
  bid: '/business-bidding/std/app/api/v1/bidding/bid',
  //获取用户信息
  getUserInfo: '/business-app-user/std/app/api/v1/app/user/info',
  //获取地址列表
  getAddressList: '/business-address/std/app/api/v1/app/user/address/all',
  //获取地址详情
  getAddressInfo: '/business-address/std/app/api/v1/app/user/address',
  //更新地址
  updateAddress: '/business-address/std/app/api/v1/app/user/address/update',
  //新增地址
  createAddress: '/business-address/std/app/api/v1/app/user/add/address',
  //删除地址
  deleteAddress: '/business-address/std/app/api/v1/app/user/address/delete',
  //获取订单列表
  getOrderList: '/business-order/std/app/api/v1/user/orderlist/',
  //订单详情
  getOrderInfo: '/web-app-facade/std/app/api/v1/user/order/',
  //获取订单配置项
  getOrderPayway: '/web-app-facade/std/app/api/v1/user/order/config',
  //订单付款配置
  getPayway: '/business-order/std/app/api/v1/order/payway/info',
  //创建订单发票
  createInvoice: '/business-invoice/std/app/api/v1/invoice/create',
  //获取订单各状态数量
  getOrderNumByStatus: '/business-order/std/app/api/v1/order/all/status/num',
  //确认订单付款方式
  postOrderPayway: '/business-order/std/app/api/v1/order/payway',
  //订单配置提交生成支付订单接口
  postOrderConfig: '/business-order/std/app/api/v1/order/bill',
  //重新配置订单
  postOrderReconfig: '/business-order/std/app/api/v1/order/reconfig',
  //订单确认收货接口
  postOrderReceived: '/business-order/std/app/api/v1/user/order/received',
  //申请人工服务
  postOrderManual: '/business-order/std/app/api/v1/order/manual',
  //获取订单配送token
  getDeliveryToken: '/business-delivery/std/app/api/v1/delivery/token/',
  //获取寄存token
  getConsignmentToken: '/business-consignment/std/app/api/v1/consignment/token',
  //删除寄存
  deleteConsignment: '/business-consignment/std/app/api/v1/consignment/delete/info/',
  //自取寄存
  feeConsignment: '/business-consignment/std/app/api/v1/consignment/fee/info/',
  //获取寄存paymentNo
  getConsignmentPay: '/business-consignment/std/app/api/v1/create/consignment/payment',
  //获取自取token
  getShippmentselfToken: '/business-shippment_self /std/app/api/v1/shippmentself/token',
  //更新增值费用token
  getExtraFeeToken: '/business-extra-fee/std/app/api/v1/extraFee/token',
  //获取订单的配送记录
  getLogistics: '/business-delivery/std/app/api/v1/delivery',
  //获取摇宝列表
  getLottoList: '/business-lotto/std/app/api/v1/user/lotto/list',
  //摇宝记录
  getLottoHistory: '/business-lotto/std/app/api/v1/user/lotto',
  //摇宝订单配置
  getLottoSure: '/business-lotto/std/app/api/v1/lotto/sure',
  //提交摇宝订单
  postLottoOrader: '/business-lotto/std/app/api/v1/create/lotto/order',
  //获取默认地址
  getDefaultAddress: '/business-address/std/app/api/v1/app/user/address/default/get',
  //历史列表
  getHistoryList: '/web-app-facade/std/app/api/v1/history/auction/list',
  
  //获取会员类型
  getPartnerToken: '/business-partner/std/app/api/v1/get/userType/token',
  //获取会员详情 1级
  getInviteDetails: '/business-inviter/std/app/partner/invite/user/details',

  //获取邀请人列表 1级
  getInviteList: '/business-inviter/std/app/partner/invite/list',

  //获取会员详情 2级
  getInviteDetails2: '/business-inviter/std/app/broker/invite/user/details',

  //获取邀请人列表 2级
  getInviteList2: '/business-inviter/std/app/broker/invite/list',

  //获取资讯列表
  getNewList: '/business-article/info',

  //获取视频列表
  getVideoList: '/business-seminar/get/seminar/message',
  //获取视频详情
  getVideoInfo: '/business-seminar/get/seminar/message',

  //点赞
  dopraise: '/business-article/get/article/dopraise',

  //点赞视频
  dopraiseVideo: '/business-seminar/get/seminar/dopraise',

  //获取鉴宝
  getJB: '/business-appraisal/std/app/api/v1/appraisal/token',

  //上传鉴宝图片
  uploadJBpic: '/business-appraisal/std/app/api/v1/upload/appraisal/img',

  //删除鉴宝图片
  deleteJBpic: '/business-appraisal/std/app/api/v1/delete/appraisal/img',

  //提交鉴宝信息
  addJB: '/business-appraisal/std/app/api/v1/save/appraisal',

  //鉴宝历史列表
  getJBlist: '/business-appraisal/std/app/api/v1/appraisal/msg/list',

  //获取用户升级类型列表
  getTypeList: '/business-app-user/std/app/api/v1/app/user/type/list',

  //用户支付订单生成
  createPay: '/business-app-user/std/app/api/v1/app/user/upgrade',
  //获取订单支付项
  getPayInfo: '/business-payment/std/app/api/v1/payment/',
  //积分支付
  postIntegralPay: '/business-recreation/std/app/api/v2/user/recreation/payment/apply',
  //现金支付
  xjPay: '/business-cash-account/std/app/api/v2/account/payment/apply',
  //银联支付
  ylPay: '/business-cup/std/app/api/v1/cup/payment/express',
  //微信支付
  wxPay:'/business-wepay/std/wxpay/client/url',
  //线下支付
  xxPay: '/business-offline-pay/std/app/api/v1/offline/pay',
  //获取线下对公对私账户
  getOfflinePay: '/business-offline-pay/std/app/api/v1/offline/payObject',
  //获取帐户余额
  getAccountMoney: '/business-cash-account/std/app/api/v1/app/user/account/balance',
  //获取账户金额变更记录接口
  getAccountMoneyList: '/business-cash-account/std/app/api/v1/app/user/account/log',
  //用户账户流水详情
  getAccountMoneyInfo: '/web-app-facade/std/app/api/v1/cash/account/log/list',
  //获取娱乐积分账户接口
  getAccountIntegral:'/business-recreation/std/app/api/v1/app/user/recreation/balance',
  //获取娱乐积分变更记录接口
  getAccountIntegralList: '/business-recreation/std/app/api/v1/app/user/recreation/log',
  //申请提现支付单号
  postDrawPay: '/business-withdraw/std/app/api/v1/do/withdraw',
  //获取银行卡列表
  getCardList: '/business-bank-card/std/app/api/v1/bank/card/list',
  //添加银行卡
  addCard: '/business-bank-card/std/app/api/v1/bank/card/add',
  //删除银行卡
  deleteCard: '/business-bank-card/std/app/api/v1/bank/card/delete',
  //获取寄存
  getConsignmentList: '/business-consignment/std/app/api/v1/consignment/all/info',
  //获取关注
  getCollectList: '/business-live-remind/std/app/api/v1/live/user/remind/msg',
  //设置关注
  postGuanzhu: '/business-live-remind/std/app/api/v1/live/remind/set',
  //获取售后
  getAftermarketList: '/business-return-product/std/app/api/v1/return/productlist',
  //获取售后详情
  getAftermarketInfo:'/business-return-product/std/app/api/v1/return/product/details',
  //获取退货token
  getRefundToken: '/business-return-product/std/app/api/v1/return/product/token',
  //申请退货
  postRefund:　'/business-return-product/std/app/api/v1/return/product',
  //取消退货
  cancleRefund: '/business-return-product/std/app/api/v1/cancle/return/product',
  //售后图片上传
  uploadRefundImg: '/business-return-product/std/app/api/v1/return/product/upload/img',
  //售后图片删除
  deleteRefundImg: '/business-return-product/std/app/api/v1/delete/return/img',
  //用户信息修改(密码，昵称，性别)
  updataUserInfo: '/business-app-user/std/app/api/v1/app/user/info/update',
  //用户头像修改
  updataUserAvatar: '/business-app-user/std/app/api/v1/app/user/image',
  //个人实名认证
  identificationPersonal: "/business-certification-center/std/app/api/v1/apply/personal",
  //获取个人实名认证token
  personalToken: '/business-certification-center/std/app/api/v1/personal/token',
  //企业实名认证
  identificationEnterprise: "/business-certification-center/std/app/api/v1/apply/enterprise",
  //获取企业p实名认证token
  enterpriseToken: '/business-certification-center/std/app/api/v1/enterprise/token',
  //身份证,营业照 图片上传
  uploadIdentificationImg: "/business-certification-center/std/app/api/v1/upload/img",
  //查看实名认证状态
  getIdentificationStatus: "/business-certification-center/std/app/api/v1/apply/certificate/status",
  //查看商户申请状态
  getMerchantApplyStatus: "/business-merchant/std/app/api/v1/search/merchant/status",
  //申请商户接口
  merchantApply: '/business-merchant/std/app/api/v1/apply/merchant',
  //重新申请商户接口
  merchantApply: '/business-merchant/std/app/api/v1/apply/merchant',
  //获取商户token接口
  merchantToken: '/business-merchant/std/app/api/v1/merchant/token',
  //刷新商户Token接口
  refreshMerchantToken: '/business-merchant/std/app/api/v1/refresh/merchant/token',
  //更新商户基本信息接口
  updateMerchantInfo:　'/business-merchant/std/app/api/v1/update/merchant/info',
  //获取商户基本信息接口
  merchantInfo: '/web-app-facade/std/app/api/v1/merchant/info',
  //取商户首页(商户中心)接口
  merchantMainInfo: '/web-app-facade/std/app/api/v1/merchant/main/page',
  //商户中心上传商户LOGO
  uploadMerchantLogo: '/business-merchant/std/app/api/v1/upload/img',
  //获取商户订单列表接口
  getMerchantOrder: '/business-order/std/app/api/v1/user/merchant/orderlist/',
  //获取商户订单详情接口
  getMerchantOrderInfo: '/web-app-facade/std/app/api/v1/merchant/order/',
  //初始化拍品项和token
  initMerchantAuction: '/business-merchant-product/std/app/api/v1/app/merchant/createProduct',
  //生成拍品
  saveMerchantAuction: '/business-merchant-product/std/app/api/v1/app/merchant/addProduct',
  //发布拍品
  pushMerchantAuction: '/business-merchantauction-live/std/app/api/v1/live/public/auction/item',
  //上传拍品图片或视频
  uploadAuctionImg: '/business-merchant-product/std/app/api/v1/app/uploadFile',
  //删除拍品图片或视频
  deleteAuctionImg: '/business-merchant-product/std/app/api/v1/app/deleteFile',
  //获取商户拍品列表
  merchantAuctionList: '/business-merchantauction-live/std/app/api/v1/live/merchant/item/list',
  //下架拍品
  merchantAuctionOut: '/business-merchantauction-live/std/app/api/v1/live/merchant/item/remove',
  //获取草稿箱
  merchantAuction: '/business-merchant-product/std/app/api/v1/app/merchant/getProductList',
  //获取草稿箱详情
  merchantAuctionInfo: '/business-merchant-product/std/app/api/v1/app/merchant/getProduct',
  //删除草稿箱
  merchantAuctionDelete: '/business-merchant-product/std/app/api/v1/app/deleteDraft',
  //获取商户余额
  getMerchantBalance: '/business-merchant-account/std/app/api/v1/app/merchant/getBalance',
  //获取商户余额明细
  getMerchantBalanceLog: '/business-merchant-account/std/app/api/v1/app/merchant/account/log',
  //商户转账
  merchantTransfer: '/business-merchant-account/std/app/api/v1/app/merchant/transfer',
  //商户提现
  merchantWithdraw: '/business-withdraw/std/app/api/v1/do/merchant/withdraw',
  //商户现金付款
  merchantPay: '/business-merchant-account/std/app/api/v2/merchant/account/payment/apply',
  //商户银行卡列表
  merchantBankCardList: '/business-bank-card/std/app/api/v1/merchant/bank/card/list',
  //商户删除商户银行卡
  merchantBankCardDelete: '/business-bank-card/std/app/api/v1/bank/merchant/card/delete',
  //增加商户银行卡
  merchantBankCardAdd: '/business-bank-card/std/app/api/v1/merchant/bank/card/add',
  //获取订单余款
  merchantOrderMoney: '/web-app-facade/std/app/api/v1/merchant/order/amount',
  //首页获取商户发布的拍品
  getMerchantAuctionList: '/business-merchantauction-live/std/app/api/v1/live/public/auction/item/list',
  //商户拍品详情
  getMerchantAuctionInfo: '/web-app-facade/std/app/api/v1/merchant/auction/item/',
  //商户拍品加入围观数
  merchantAddLooker: '/business-app-view/set/app/merchant/auction/item/view/info',
  //商户拍品出价
  merchantBid: '/business-bidding/std/app/api/v1/merchant/bidding/bid',
  //商户拍品出价记录
  merchantBidInfo: '/web-app-facade/std/app/api/v1/auction/merchant/item',
  //商户拍品重新上架
  merchantAuctionRepublic: '/business-merchantauction-live/std/app/api/v1/live/republic/auction/item',
  //获取微信支付参数
  wxpayParms: '/business-wepay/std/wxpay/smallpro/params',
  
}