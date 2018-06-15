var event = (function () {
  var cliet = {}; //发布者的缓存列表（应聘者列表）
  var listen = function (key, fn) { //增加订阅者函数
    cliet[key] = fn;
  };

  var trigger = function (key,arg) { //发布消息函数
    cliet[key] && cliet[key](arg); 
  };

  var remove = function (key, fn) {
    delete cliet[key] && fn && fn()
  };

  return {
    on: listen,
    emit: trigger,
    remove: remove
  }
})()

module.exports = event