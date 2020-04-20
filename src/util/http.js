import axios from 'axios'
import common from './common'

axios.interceptors.request.use(config => {
  common.showLoading()
  return config
}, error => {
  common.closeLoading()
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  common.showLoading()
  return response
}, error => {
  common.closeLoading()
  return Promise.resolve(error.response)
})

export default {
  request (url, method, paramsJson, callback) {
    let timeout = 60 * 1000
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        method: method,
        data: paramsJson,
        timeout,
        headers: {'Content-Type': 'application/json;charset: utf-8'}
      }).then(
        (response) => {
          if (!response.data) {
            console.log('调用服务失败')
            return
            // todo 添加提示框
          }
          if (response.data.status === 1) {
            // todo 返回成功数据待处理
            if (callback) {
              // todo 回调函数处理
            }
          } else {
            // todo 返回失败数据待处理
          }
        }
      ).catch(
        // eslint-disable-next-line handle-callback-err
        (error) => {
          console.log('请求失败')
        }
      )
    })
  }
}
