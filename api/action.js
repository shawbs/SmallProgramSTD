const $ = require('./index.js')
const API = require('./api.js')
const {conf} = require('../config.js')

const baseurl = conf[conf.env].host

const request = {

  getPMGZ: () => $.getAsset('http://text.shuntd.cn/pmgz.txt'),
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

  //获取积分商场详情
  getStoreDetail: (paramrter) => $.post(baseurl + API.storeDetail, paramrter, true),
  //预展
  getPreviewInfo: (auctionId) => $.get(baseurl + API.preview, { auctionId: auctionId }, true),
  //获取验证码
  getCode: (phone) => $.post(baseurl + API.getCode, { phone: phone }),
  //登录
  login: (parameter) => $.post(baseurl + API.login, Object.assign({ deviceId: '', sb: 'xzz' }, parameter), true),
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
  postGuanzhu: (parameter) => $.post(baseurl + API.postGuanzhu, parameter, true),

  //获取售后详情'/business-return-product/std/app/api/v1/return/product/details/{orderNo}'
  getAftermarketInfo: (orderNo) => $.get(baseurl + API.getAftermarketInfo + `/${orderNo}`, {}, true),

  //用户信息修改(密码，昵称，性别)
  updataUserInfo: (parameter) => $.post(baseurl + API.updataUserInfo, parameter, false),
  //用户头像修改
  updataUserAvatar: (parameter, cb) => $.upload(baseurl + API.updataUserAvatar, parameter, true),
  //个人实名认证
  identificationPersonal: (parameter) => $.post(baseurl + API.identificationPersonal, parameter, true),
  //身份证,营业照 图片上传
  uploadIdentificationImg: (parameter) => $.upload(baseurl + API.uploadIdentificationImg, parameter, true),
  //查看认证状态
  getIdentificationStatus: () => $.post(baseurl + API.getIdentificationStatus, {}, true),
}

module.exports = request