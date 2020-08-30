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
  common.closeLoading()
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
          if (!response.status.toString().startsWith('2')) {
            common.commonMessage(response.data.message, 'error')
            return
          }
          if (!response.data) {
            console.log('调用服务失败')
            common.commonMessage('调用服务失败', 'error')
            return
          }
          if (response.data.code === '1') {
            if (callback) {
              callback(response.data)
            }
          } else {
            common.commonMessage(response.data.message, 'error')
          }
        }
      ).catch(
        // eslint-disable-next-line handle-callback-err
        (error) => {
          console.log('请求失败')
          common.commonMessage('请求失败', 'error')
        }
      )
    })
  }
}
