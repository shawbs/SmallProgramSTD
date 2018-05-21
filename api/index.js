const { conf } = require('../config.js')
const base = require('../utils/base.js')

const getNetwork = ()=>{
  wx.getNetworkType({
    success: function (res) {
      // 返回网络类型, 有效值：
      // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
      var networkType = res.networkType
      console.log(networkType)
    }
  })


}


/**
 * 刷新TOKEN
 */
const refreshToken = (showLoader=false) => {
  return new Promise((resolve,reject)=>{
    showLoader && wx.showLoading({
      title: 'loading..',
      mask: true,
    })
    wx.request({
      url: conf[conf.env].host + '/business-app-user/std/app/api/v1/app/user/login/refreshToken',
      data: {
        refreshSign: wx.getStorageSync('__refreshToken'),
        location: 2,
        sb: 'xzz'
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          let data = res.data
          if (data.code == 200) {
            wx.setStorageSync('__refreshToken', data.data.refreshToken)
            wx.setStorageSync('__accessToken', data.data.accessToken)
            resolve(data.data.accessToken);
          } else {
            base.loginHandle();
            reject(data.msg)
          }
        } else {
          console.log(`${res.statusCode}, request fail.`);
        }
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function () {
        showLoader && wx.hideLoading()
      }
    })
  })
  
}

/**
 * 封装get请求,
 * url 接口地址
 * paramrter 请求参数
 * showLoader 显示请求提示
 * return {Promise}
 */
const get = function(url,paramrter,showLoader=false){
   
  return new Promise((resolve, reject) => {
    showLoader && wx.showLoading({
      title: 'loading..',
      mask: true,
    })
    wx.request({
      url: url,
      data: paramrter,
      header: {
        'accessToken': wx.getStorageSync('__accessToken')
      },
      success: function (res) {
        //请求成功
        if (res.statusCode == 200) {
          //接口返回正确码
          if (res.data.code == 200) {
            resolve(res.data);
          }
          //token过期，刷新token后重新请求
          else if (res.data.code == 401) {
            refreshToken(showLoader).then(accessToken => {
              get(url, paramrter, showLoader)
            }).catch(msg => {
              console.error(msg)
            })
          }
          //token错误，未登录或其它原因
          else if (res.data.msg == '无效token') {
            base.loginHandle();
          }
          //接口返回错误码 
          else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            reject(res.data.msg)
          }
        }
        //请求失败
        else {
          console.log(`${res.statusCode}, request fail.`);
        }
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function () {
        showLoader && wx.hideLoading();
      }
    })
  })
}

/**
 * 封装post请求,  请求头有accesstoken，
 * url 接口地址
 * paramrter 请求参数
 * showLoader 显示请求提示
 * return {Promise}
 */
const post = function (url, paramrter, showLoader=false) {
    
    return new Promise((resolve, reject) => {
      showLoader && wx.showLoading({
        title: 'loading..',
        mask: true,
      })
      wx.request({
        url: url,
        data: paramrter,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'accessToken': wx.getStorageSync('__accessToken')
        },
        success: function (res) {
          // console.log(res)
          //请求成功
          if (res.statusCode == 200) {
            //接口返回正确码
            if (res.data.code == 200) {
              resolve(res.data);
            }
            //token过期，刷新token后重新请求
            else if (res.data.code == 401) {
              refreshToken(showLoader).then(accessToken => {
                post(url, paramrter, showLoader)
              }).catch(msg => {
                console.error(msg)
              })
            }
            //token错误，未登录或其它原因
            else if (res.data.msg == '无效token') {
              base.loginHandle();
            }
            //接口返回错误码 
            else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
              reject(res.data.msg)
            }
          }
          //请求失败
          else {
            console.log(`${res.statusCode}, request fail.`);
          }
        },
        fail: function (err) {
          console.log(err)
        },
        complete: function () {
          showLoader && wx.hideLoading()
        }
      })
    })
 
}

//获取静态资源
const getAsset = (url)=>{
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          console.log(`${data.statusCode}, request fail.`);
          reject()
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  })
}

/**
 * 封装文件上传请求,  请求头有accesstoken，
 * url 接口地址
 * paramrter 请求参数{files上传文件资源路径:string，filename上传文件对应的key:string,formdata额外的数据:Object}
 * showLoader 显示请求提示
 * return {Promise}
 */
const upload = function (url, paramrter, showLoader = false) {

  return new Promise((resolve, reject) => {
    showLoader && wx.showLoading({
      title: '上传中..',
      mask: true,
    })
    wx.uploadFile({
      url: url,
      filePath: paramrter.files,
      name: paramrter.filename,
      formData: paramrter.formData || {},
      header: {
        'accessToken': wx.getStorageSync('__accessToken')
      },
      success: function (res) {
        res.data = JSON.parse(res.data);
        //请求成功
        if (res.statusCode == 200) {
          //接口返回正确码
          if (res.data.code == 200) {
            resolve(res.data);
          }
          //token过期，刷新token后重新请求
          else if (res.data.code == 401) {
            refreshToken(showLoader).then(accessToken => {
              upload(url, paramrter, showLoader)
            }).catch(msg => {
              console.error(msg)
            })
          }
          //token错误，未登录或其它原因
          else if (res.data.msg == '无效token') {
            base.loginHandle();
          }
          //接口返回错误码 
          else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            reject(res.data.msg)
          }
        }
        //请求失败
        else {
          console.log(`${res.statusCode}, request fail.`);
        }
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function () {
        showLoader && wx.hideLoading()
      }
    })
  })

}

/**
 * 上传文件接口
 * return uploadTask对象(该对象可以获取上传进度)
 */
const uploadFile = function (url, paramrter, cb) {
    return wx.uploadFile({
      url: url,
      filePath: paramrter.files,
      name: paramrter.filename,
      formData: paramrter.formData || {},
      header: {
        'accessToken': wx.getStorageSync('__accessToken')
      },
      success: function (res) {
        res.data = JSON.parse(res.data);
        //请求成功
        if (res.statusCode == 200) {
          //接口返回正确码
          if (res.data.code == 200) {
            cb && cb(res.data);
          }
          //token过期，刷新token后重新请求
          else if (res.data.code == 401) {
            refreshToken().then(accessToken => {
              uploadFile(url, paramrter, cb)
            }).catch(msg => {
              console.error(msg)
            })
          }
          //token错误，未登录或其它原因
          else if (res.data.msg == '无效token') {
            base.loginHandle();
          }
          //接口返回错误码 
          else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
        //请求失败
        else {
          console.log(`${res.statusCode}, request fail.`);
        }
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function () {
      }
    })
}

module.exports = {
  get,
  post,
  getAsset,
  getNetwork,
  upload,
  uploadFile
}