/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
/**
 * 下载excel
 * 解析流
 * @export
 * @param {blob} data
 * @param {filename} names
 */
export function downloadFile(data, names) {
  if (!data) {
    return
  }
  if (window.navigator.msSaveOrOpenBlob) {
    // 兼容ie11
    try {
      var blobObject = new Blob([data])
      window.navigator.msSaveOrOpenBlob(blobObject, names + '.xlsx')
    } catch (e) {
      console.log(e)
    }
  } else {
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', names + '.xlsx')
    document.body.appendChild(link)
    link.click()
  }
}
