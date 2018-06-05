
//未登录处理
const loginHandle = function () {
  // wx.showToast({
  //   title: '检测到未登录！前往登录',
  //   icon: 'none'
  // })
  setTimeout(function(){
    wx.navigateTo({
      url: '/pages/user/login/login',
    })
  },1500)
}

//检测当前登录状态
const checkLogin = function(){
  let accessToken = wx.getStorageSync('__accessToken')
  let refreshToken = wx.getStorageSync('__refreshToken')
  let user = wx.getStorageSync('__User')
  if (!accessToken || !refreshToken || !user){
    return false    
  }else{
    return true
  }
}

module.exports = {
  loginHandle,
  checkLogin
}