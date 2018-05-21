
//未登录处理
const loginHandle = function () {
  wx.showToast({
    title: '检测到未登录！前往登录',
    icon: 'none'
  })
  setTimeout(function(){
    wx.navigateTo({
      url: '/pages/user/login/login',
    })
  },1500)
}

//检测当前登录状态
const checkLogin = function(){
  let accessToken = wx.getStorageSync('accessToken')
  let refreshToken = wx.getStorageSync('refreshToken')
  let user = wx.getStorageSync('__User')
  if (!accessToken || !refreshToken || !user){
    loginHandle();
  }
}

module.exports = {
  loginHandle,
  checkLogin
}