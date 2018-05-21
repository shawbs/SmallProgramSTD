
module.exports = {
  //发送验证码
  getCode: '/service-sms/std/app/sms/vcode',
  //刷新token
  refreshToken: '/business-app-user/std/app/api/v1/app/web/user/login/refreshToken',
  //登录
  login: '/business-app-user/std/app/api/v1/app/login/mobile',
  //首页
  index: {
    banner: '/business-banner/get/banner/list',
    previewLive: '/web-app-facade/std/app/api/v1/show/mainpage',
    live: '/web-app-facade/std/app/api/v1/mainpage',
  },
  //商场换宝列表
  storeListInfo: '/business-treasure-shop/std/app/api/v1/treasure/list',
  //商场换宝类型
  storeCateType: '/business-treasure-shop/std/app/api/v1/treasure/cate/list',
  //商场换宝详情
  storeDetail: '/business-treasure-shop/std/app/api/v1/treasure/detail',
  //商场换宝订单生成
  storePaySure: '/business-treasure-shop/std/app/api/v1/treasure/order',
  //限时拍品列表
  list: '/web-app-facade/std/app/api/v1/show/auction/info',

  //围观人数
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

  //点赞
  dopraise: '/business-article/get/article/dopraise',

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
  //提现支付
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
  //用户信息修改(密码，昵称，性别)
  updataUserInfo: '/business-app-user/std/app/api/v1/app/user/info/update',
  //用户头像修改
  updataUserAvatar: '/business-app-user/std/app/api/v1/app/user/image',
  //个人实名认证
  identificationPersonal: "/business-certification-center/std/app/api/v1/apply/personal",
  //身份证,营业照 图片上传
  uploadIdentificationImg: "/business-certification-center/std/app/api/v1/upload/img",
  //查看认证状态
  getIdentificationStatus: "/business-certification-center/std/app/api/v1/apply/certificate/status",
}