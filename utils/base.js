
//未登录处理
let linkLoginTimer;
const loginHandle = function () {
  //如果该定时器已定义则刷新它
  clearTimeout(linkLoginTimer)
  linkLoginTimer = setTimeout(function () {
    wx.navigateTo({
      url: '/pages/user/login/login',
    })
  }, 1500)
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

//返回一个函数,传递函数会至少大于delay时间才能再次调用
const debounce = function (action, delay) {
  var timer = null;
  return function () {
    var self = this,
      args = arguments;

    clearTimeout(timer);
    timer = setTimeout(function () {
      action.apply(self, args)
    }, delay);
  }
}



module.exports = {
  loginHandle,
  checkLogin,
  debounce
}