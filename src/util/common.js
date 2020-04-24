/*eslint-disable*/

import { Loading, Message } from 'element-ui'

let loadInstance

export default {
  // type 枚举：success/warning/info/error
  commonMessage (message,type) {
    Message({
      showClose: true,
      message,
      type
    });
  },
  showLoading () {
    loadInstance = Loading.service({fullscreen: true})
  },
  closeLoading () {
    loadInstance.close()
  }
}
