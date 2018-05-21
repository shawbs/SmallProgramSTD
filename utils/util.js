//格式化为 年-月-日 时：分：秒
const formatTime = datetime => {
  let date = new Date(datetime)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//格式化为 年-月-日 时：分
const formatTimeSimple = datetime => {
  let date = new Date(datetime)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

//格式化为 年-月-日
const formatYear = datetime => {
  let date = datetime? new Date(datetime) : new Date;
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

//相对时间，如2017/1/1相对今天是什么日期
const relativeDate = datetime => {
  const date = new Date(datetime)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const week = getWeek(date.getDay());
  const hour = date.getHours()
  const minute = date.getMinutes()

  const c_year = new Date().getFullYear();
  const c_month = new Date().getMonth() + 1;
  const c_day = new Date().getDate();

  let timeStr = (c_year == year && c_month == month && c_day == day) ? '今天' : week;
  return !!datetime ? timeStr + ' ' + formatNumber(hour) + ':' + formatNumber(minute) : '';
}

//获取星期
function getWeek(index) {
  var weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return weekArr[index];
}

//格式化1为01
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//格式化字符串超出6省略为。。
const format = (str,size=6)=>{
  // console.log(str)
  return str.length > size ? str.slice(0, size) + '..' : str;
}

//把字符串数组转化为常规数组
const transformImgUrls = (arr, key) =>{
  if (Array.isArray(arr) && arr.length > 0) {
    for (let i = (arr.length - 1); i >= 0; i--) {
      arr[i][key] = JSON.parse(arr[i][key])
    }
  }
  return arr || [];
}

//把订单状态转换为文字
const getStatusText = (status)=>{
  let o = {
    '30': '已成交',
    '31': '订单失败',
    '21': '待收货',
    '20': '待发货',
    '0': '待确认',
    '10': '待付款',
    '11': '待付款',
    '12': '待付款',
    '22': '超期',
    '23': '订单维权中'
  }
  return o[status]
}

//把售后订单状态转换为文字
const getAfterStatusText = (status)=>{
  let o = {
    0: '待退货',
    10: '待审核',
    11: '退货中',
    12: '已退货',
    13: '退货失败',
    14: '取消退货',
    15: '退货过期'
  }
  return o[status]
}

const getCountDown = function (timestamp){
  if (timestamp != null) {

      var nowTime = new Date().getTime();
      var endTime = timestamp;
      var t = endTime - nowTime;
      if (t < 0) {
        $("#countdown").html('等待落锤');
        clearInterval(timer);
        return;
      }
      // console.log(t)
      var d = Math.floor(t / 1000 / 60 / 60 / 24);
      var hour = Math.floor(t / 1000 / 60 / 60 % 24);
      var min = Math.floor(t / 1000 / 60 % 60);
      var sec = Math.floor(t / 1000 % 60);
      // console.log(d,hour,min,sec)

      if (hour < 10) {
        hour = "0" + hour;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      var countDownTime = d + '天' + hour + "小时" + min + "分" + sec + '秒';

      return countDownTime

  }
  return ''
}

//清理缓存 带__开头的key为主要缓存,非退出登录不能清除
const celarStorage = function(){
  var res = wx.getStorageInfoSync()
  let keys = res.keys;
  for (let key of keys){
    if (!/^\__+/.test(key)){
      wx.removeStorageSync(key)
    }
  }
}

//检查缓存大小,智能清理缓存
const autoCelarStorage = function(){
  var res = wx.getStorageInfoSync();
  let currentSize = res.currentSize;
  let limitSize = res.limitSize;
  if (currentSize >= limitSize-1024){
    celarStorage();
  }
}

module.exports = {
  formatTime,
  formatTimeSimple,
  relativeDate,
  format,
  transformImgUrls,
  getStatusText,
  getCountDown,
  getAfterStatusText,
  celarStorage,
  autoCelarStorage,
  formatYear
}
