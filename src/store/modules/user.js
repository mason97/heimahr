import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken() // 从缓存中读取初始值
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  REMOVE_TOKEN(state) {
    state.token = null
    // 退出登录，清除缓存
    removeToken()
  }
}

const actions = {
  // context 上下文，
  async login(context, payload) {
    // 调用登录接口
    const token = await login(payload)
    context.commit('SET_TOKEN', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
