import Vue from 'vue'
import Vuex from 'vuex'
import {listUserInfo} from '@/config/getData'

Vue.use(Vuex)

const state = {
  userInfo: {
    initData: 'initData'
  }
}

const mutations = {
  saveUserInfo (state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  async getUserData () {
    try {
      const res = await listUserInfo()
      if (res.status === 1) {
        this.$store.commit('saveUserInfo', res)
      } else {
        throw new Error(res.message)
      }
    } catch (e) {
      console.log(e.message)
    }
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
