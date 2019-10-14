// 引入拦截处理后的 axios
import request from './request'
// 自定义判断元素类型JS
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

function sGetObject(k) {
  try {
    var v = sessionStorage.getItem(k)
    return v == null ? null : JSON.parse(v)
  } catch (e) {}
}

// 返回在vue模板中的调用接口
export default {
  post: function(url, data = {}) {
    return request({
      url,
      method: 'post',
      data
    })
  },

  // get 请求
  get: function(url, params = {}) {
    return request({
      url,
      method: 'get',
      params
    })
  },
  sSetObject: function(k, v) {
    try {
      sessionStorage.setItem(k, JSON.stringify(v))
    } catch (e) {}
  },
  sGetObject: function(k) {
    try {
      var v = sessionStorage.getItem(k)
      return v == null ? null : JSON.parse(v)
    } catch (e) {}
  },
  //时间戳转换成日期格式
  // fmt:yyyy-MM-dd hh:mm:ss(可选)
  formatDate: function(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : this.padLeftZero(str)
        )
      }
    }
    return fmt
  },
  getTimes: function() {
    var date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth() + 1
    this.date = date.getDate()
    this.day = new Array(
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    )[date.getDay()]
    this.hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    this.minute =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    this.second =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    var currentTime =
      this.year +
      '' +
      this.month +
      '' +
      this.date +
      '' +
      this.hour +
      '' +
      this.minute +
      '' +
      this.second
    return currentTime
  }
}
