const $ = require('./index.js')
const API = require('./api.js')
const {conf} = require('../config.js')

const baseurl = conf[conf.env].host

const request = {
  //注册协议
  getzcxy: () => $.getAsset('http://text.shuntd.cn/zcxy.txt'),
  //常见问题
  getcjwt: () => $.getAsset('http://text.shuntd.cn/cjwt.txt'),
  //拍卖规则
  getPMGZ: () => $.getAsset('http://text.shuntd.cn/pmgz.txt'),
  //首页banner图
  getBanner: () => $.get(baseurl + API.index.banner, {}),
  //展拍拍场
  // getZPLive: () => $.get(baseurl + API.index.getZPLive, {}),
  //即时拍场
  getJSLive: () => $.get(baseurl + API.index.previewLive, { broadcast: 4 }),
  //精选拍场
  getJXLive: () => $.get(baseurl + API.index.live, {}),
  //获取积分商场列表
  getStoreListInfo: (paramrter) => $.post(baseurl + API.storeListInfo, paramrter, true),
  //获取商品类型
  getStoreCateType: (paramrter) => $.post(baseurl + API.storeCateType, paramrter, true),
  //获取限时拍品列表
  getListInfo: (paramrter) => $.post(baseurl + API.list, paramrter, true),
  //获取限时拍品详情
  getDetail: (paramrter) => {
    let url;
    if (paramrter.exType == 1) {
      url = '/web-app-facade/std/app/api/v1/auction/item/' + paramrter.auctionItemId + '/detail';
    } else {
      url = '/web-app-facade/std/app/api/v1/show/auction/item/' + paramrter.auctionItemId + '/detail';
    }
    return $.post(baseurl + url, {}, true);
  },
  //加入围观人数
  addLooker: (paramrter) => $.post(baseurl + API.addLooker, paramrter),
  //出价记录
  bidList: (paramrter) => $.post(baseurl + API.bidList + `/${paramrter.auctionItemId}/bidinfo`, paramrter),
  //出价
  postbid: (paramrter) => $.post(baseurl + API.bid, paramrter),
  //获取积分商场详情
  getStoreDetail: (paramrter) => $.post(baseurl + API.storeDetail, paramrter, true),
  //预展
  getPreviewInfo: (auctionId) => $.get(baseurl + API.preview, { auctionId: auctionId }, true),
  //获取验证码
  getCode: (phone) => $.post(baseurl + API.getCode, { phone: phone }),
  //登录
  login: (parameter) => $.post(baseurl + API.login, Object.assign({ deviceId: '', sb: 'xzz' }, parameter), true),
  //签到
  checkIn: () => $.post(baseurl + API.checkIn, {}),
  //获取用户信息
  getUserInfo: () => $.post(baseurl + API.getUserInfo, {}),
  //获取地址列表
  getAddressList: (parameter) => $.post(baseurl + API.getAddressList, parameter, true),
  //获取地址详情
  getAddressInfo: (parameter) => $.post(baseurl + API.getAddressInfo, parameter, true),
  //修改地址
  updateAddress: (parameter) => $.post(baseurl + API.updateAddress, parameter, true),
  //新增地址
  createAddress: (parameter) => $.post(baseurl + API.createAddress, parameter, true),
  //删除地址
  deleteAddress: (parameter) => $.post(baseurl + API.deleteAddress, parameter, true),
  //获取订单列表
  getOrderList: (parameter) => $.get(baseurl + API.getOrderList + `${parameter.status}/${parameter.page}/10`, {}, true),
  //获取订单详情
  getOrderInfo: (parameter) => $.get(baseurl + API.getOrderInfo + parameter.orderNo, {}, true),
  //获取摇宝列表
  getLottoList: (parameter) => $.post(baseurl + API.getLottoList, parameter, true),
  // 获取摇宝历史记录
  getLottoHistory: (parameter) => $.post(baseurl + API.getLottoHistory, parameter, true),
  //获取摇宝订单配置w信息
  getLottoSure: (lottoId) => $.post(baseurl + API.getLottoSure, { lottoId: lottoId }, true),
  //提交摇宝订单
  postLottoOrader: (parameter) => $.post(baseurl + API.postLottoOrader, parameter, true),
  
  //积分支付
  postIntegralPay: (parameter) => $.post(baseurl + API.postIntegralPay, parameter, true),
  //积分商场订单生成
  storePaySure: (paramrter) => $.post(baseurl + API.storePaySure, paramrter, true),
  //获取默认收货地址
  getDefaultAddress: () => $.post(baseurl + API.getDefaultAddress, {}, true),
  //获取历史列表
  getHistoryList: (parameter) => $.post(baseurl + API.getHistoryList, parameter, true),
  //获取邀请人列表 1级
  getInviteList: (parameter) => $.post(baseurl + API.getInviteList, parameter, true),
  //获取token
  getPartnerToken: () => $.post(baseurl + API.getPartnerToken, {}, false),
  //获取详情 1级
  getInviteDetails: (parameter) => $.post(baseurl + API.getInviteDetails, parameter, false),
  //获取邀请人列表 2级
  getInviteList2: (parameter) => $.post(baseurl + API.getInviteList2, parameter, true),
  //获取业务员邀请详情 2级
  getInviteDetails2: (parameter) => $.post(baseurl + API.getInviteDetails2, parameter, false),

  //获取资讯
  getNewList: (parameter) => $.get(baseurl + API.getNewList, parameter),

  //获取视频列表
  getVideoList: (parameter) => $.get(baseurl + API.getVideoList, parameter),

  //点赞
  dopraise: (parameter) => $.get(baseurl + API.dopraise, parameter),

  //获取鉴宝
  getJB: () => $.post(baseurl + API.getJB, {}, true),

  //上传鉴宝图片
  uploadJBpic: (parameter,cb) => $.upload(baseurl + API.uploadJBpic, parameter, true),

  //删除鉴宝图片
  deleteJBpic: (parameter) => $.post(baseurl + API.deleteJBpic, parameter, true),

  //提交鉴宝信息
  addJB: (parameter) => $.post(baseurl + API.addJB, parameter, true),

  //获取鉴宝历史
  getJBlist: (parameter) => $.post(baseurl + API.getJBlist, parameter, true),

  //获取用户升级类型列表
  getTypeList: () => $.post(baseurl + API.getTypeList, {}, true),

  //创建支付订单
  createPay: (parameter) => $.post(baseurl + API.createPay, parameter, true),
  //获取支付信息
  getPayInfo: (PaymentNo) => $.get(baseurl + API.getPayInfo + PaymentNo, {}, true),
  //现金支付
  xjPay: (paymentToken) => $.post(baseurl + API.xjPay, { paymentToken: paymentToken}, true),
  //银联支付
  ylPay: (parameter) => $.post(baseurl + API.ylPay, parameter, true),
  //微信支付
  wxPay: (parameter) => $.post(baseurl + API.wxPay, parameter, true),
  //线下支付
  xxPay: (parameter, cb) => $.uploadFile(baseurl + API.xxPay, parameter, cb),
  //获取线下对公对私账户
  getOfflinePay: () => $.get(baseurl + API.getOfflinePay, {}, true),

  //获取帐户余额
  getAccountMoney: () => $.post(baseurl + API.getAccountMoney, {}, true),
  //获取账户金额变更记录接口
  getAccountMoneyList: (parameter) => $.post(baseurl + API.getAccountMoneyList, parameter, true),
  //用户账户流水详情
  getAccountMoneyInfo: (parameter) => $.post(baseurl + API.getAccountMoneyInfo, parameter, true),
  //获取娱乐积分账户接口
  getAccountIntegral: () => $.post(baseurl + API.getAccountIntegral, {}, true),
  //获取娱乐积分变更记录接口
  getAccountIntegralList: (parameter) => $.post(baseurl + API.getAccountIntegralList, parameter, true),
  //提现支付
  postDrawPay: (parameter) => $.post(baseurl + API.postDrawPay, parameter, true),
  //获取银行卡列表
  getCardList: () => $.post(baseurl + API.getCardList, {}, true),
  //添加银行卡
  addCard: (parameter) => $.post(baseurl + API.addCard, parameter, true),
  //删除银行卡
  deleteCard: (bankCardId) => $.post(baseurl + API.deleteCard, { bankCardId: bankCardId}, true),
  //获取寄存
  getConsignmentList: (parameter) => $.post(baseurl + API.getConsignmentList, parameter, true),
  //获取关注
  getCollectList: () => $.post(baseurl + API.getCollectList, {}, true),
  //获取售后 /business-return-product/std/app/api/v1/return/productlist/{status}/{page}/{limit}
  getAftermarketList: (parameter) => $.get(baseurl + API.getAftermarketList + `/${parameter.status}/${parameter.page}/${parameter.limit}`, {}, true),
  //设置关注
  postGuanzhu: (parameter) => $.post(baseurl + API.postGuanzhu, parameter, false),
  //获取售后详情'/business-return-product/std/app/api/v1/return/product/details/{orderNo}'
  getAftermarketInfo: (orderNo) => $.get(baseurl + API.getAftermarketInfo + `/${orderNo}`, {}, true),
  //获取退货token
  getRefundToken: (parameter) => $.post(baseurl + API.getRefundToken, parameter, true),
  //申请退货
  postRefund: (parameter) => $.post(baseurl + API.postRefund, parameter, true),
  //取消退货
  cancleRefund: (parameter) => $.post(baseurl + API.cancleRefund, parameter, true),
  //售后图片上传
  uploadRefundImg: (parameter) => $.upload(baseurl + API.uploadRefundImg, parameter, true),
  //售后图片删除
  deleteRefundImg: (parameter) => $.post(baseurl + API.deleteRefundImg, parameter, true),
  //用户信息修改(密码，昵称，性别)
  updataUserInfo: (parameter) => $.post(baseurl + API.updataUserInfo, parameter, false),
  //用户头像修改
  updataUserAvatar: (parameter) => $.upload(baseurl + API.updataUserAvatar, parameter, true),
  //个人实名认证
  identificationPersonal: (parameter) => $.post(baseurl + API.identificationPersonal, parameter, true), 
  //获取个人实名认证token
  personalToken: () => $.post(baseurl + API.personalToken, {}, true),
  //企业实名认证
  identificationEnterprise: (parameter) => $.post(baseurl + API.identificationEnterprise, parameter, true), 
  //获取企业实名认证token
  enterpriseToken: () => $.post(baseurl + API.enterpriseToken, {}, true),
  //身份证,营业照 图片上传
  uploadIdentificationImg: (parameter) => $.upload(baseurl + API.uploadIdentificationImg, parameter, true),
  //查看实名认证状态
  getIdentificationStatus: () => $.post(baseurl + API.getIdentificationStatus, {}, true),
  //查看商户申请状态
  getMerchantApplyStatus: () => $.post(baseurl + API.getMerchantApplyStatus, {}, true),
  //申请商户接口
  merchantApply: (parameter) => $.post(baseurl + API.merchantApply, parameter, true),
  //�?�取商户token�?�口
  merchantToken: () => $.post(baseurl + API.merchantToken, {}, true),
  //更新商户基本信息�?�口
  updateMerchantInfo: (parameter) => $.merchantPost(baseurl + API.updateMerchantInfo, parameter, true),
  //�?�取商户基本信息�?�口
  merchantInfo: () => $.merchantPost(baseurl + API.merchantInfo, {}, true),
  //取商户首页(商户中心)�?�口
  merchantMainInfo: () => $.merchantPost(baseurl + API.merchantMainInfo, {}, true),
  //商户中心上传商户LOGO
  uploadMerchantLogo: (parameter) => $.merchantUpload(baseurl + API.uploadMerchantLogo, parameter, true),
  //�?�取商户订单列表�?�口
  getMerchantOrderList: (parameter) => $.merchantGet(baseurl + API.getMerchantOrder + `${parameter.status}/${parameter.page}/10`, {}, true),
  //�?�取商户订单详情�?�口
  getMerchantOrderInfo: (parameter) => $.merchantGet(baseurl + API.getMerchantOrderInfo + `${parameter.orderToken}`, {}, true),
  //初始化拍品项和token
  initMerchantAuction: (parameter) => $.merchantPost(baseurl + API.initMerchantAuction, parameter, true),
  //生成拍品
  saveMerchantAuction: (parameter) => $.merchantPost(baseurl + API.saveMerchantAuction, parameter, true),
  //发布拍品
  pushMerchantAuction: (parameter) => $.merchantPost(baseurl + API.pushMerchantAuction, parameter, true),
  //上传拍品图片或视频
  uploadAuctionImg: (parameter) => $.merchantUpload(baseurl + API.uploadAuctionImg, parameter, true),
  //删除拍品图片或视频
  deleteAuctionImg: (parameter) => $.merchantPost(baseurl + API.deleteAuctionImg, parameter, true),
  //下�?�拍品
  merchantAuctionOut: (parameter) => $.merchantPost(baseurl + API.merchantAuctionOut, parameter, true),
  //�?�取拍品列表
  merchantAuctionList: (parameter) => $.merchantPost(baseurl + API.merchantAuctionList, parameter, true),
  //�?�取草稿箱
  merchantAuction: (parameter) => $.merchantPost(baseurl + API.merchantAuction, parameter, true),
  //�?�取草稿箱详情
  merchantAuctionInfo: (parameter) => $.merchantPost(baseurl + API.merchantAuctionInfo, parameter, true),
  //删除草稿箱
  merchantAuctionDelete: (parameter) => $.merchantPost(baseurl + API.merchantAuctionDelete, parameter, true),
  //�?�取商户余额
  getMerchantBalance: (parameter) => $.merchantPost(baseurl + API.getMerchantBalance, parameter, true),
  //�?�取商户余额�?细
  getMerchantBalanceLog: (parameter) => $.merchantPost(baseurl + API.getMerchantBalanceLog, parameter, true),
  //商户转账
  merchantTransfer: (parameter) => $.merchantPost(baseurl + API.merchantTransfer, parameter, true),
  //商户提�?�
  merchantWithdraw: (parameter) => $.merchantPost(baseurl + API.merchantWithdraw, parameter, true),
  //商户�?�金付款
  merchantPay: (parameter) => $.merchantPost(baseurl + API.merchantPay, parameter, true),
  //商户银行卡列表
  merchantBankCardList: (parameter) => $.merchantPost(baseurl + API.merchantBankCardList, parameter, true),
  //商户删除商户银行卡
  merchantBankCardDelete: (parameter) => $.merchantPost(baseurl + API.merchantBankCardDelete, parameter, true),
  //�?加商户银行卡
  merchantBankCardAdd: (parameter) => $.merchantPost(baseurl + API.merchantBankCardAdd, parameter, true),
  //�?�取订单余款
  merchantOrderMoney: (parameter) => $.merchantPost(baseurl + API.merchantOrderMoney, parameter, true),
  //首页�?�取商户发布的拍品
  getMerchantAuctionList: (parameter) => $.post(baseurl + API.getMerchantAuctionList, parameter, true),
  //商户拍品详情
  getMerchantAuctionInfo: (parameter) => $.get(baseurl + API.getMerchantAuctionInfo + `${parameter.auctionItemId}/detail`, {}, true),
  //商户拍品加入围观数
  merchantAddLooker: (parameter) => $.post(baseurl + API.merchantAddLooker, parameter, false),
  //商户出价
  merchantBid: (parameter) => $.post(baseurl + API.merchantBid, parameter, false),
  //商户拍品出价记录
 
  //商户拍品加入围观数
  merchantAddLooker: (parameter) => $.post(baseurl + API.merchantAddLooker, parameter, false),
  //商户出价
  merchantBid: (parameter) => $.post(baseurl + API.merchantBid, parameter, false),
  //商户拍品出价记录
  merchantBidInfo: (parameter) => $.post(baseurl + API.merchantBidInfo + `/${parameter.auctionItemId}/bidinfo`, {}, false),
  //商户拍品重新上�?�
  merchantAuctionRepublic: (parameter) => $.merchantPost(baseurl + API.merchantAuctionRepublic, parameter, false),
}

module.exports = request