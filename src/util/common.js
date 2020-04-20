/*eslint-disable*/

import { Loading } from 'element-ui'

let loadInstance

export default {
  showLoading () {
    loadInstance = Loading.service({fullscreen: true})
  },
  closeLoading () {
    loadInstance.close
  }
}
