import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'

const state = {
  token: getToken(), // 从缓存中读取初始值
  userInfo: {} // 存储用户信息
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
  },
  // 设置用户信息
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  // context 上下文，
  async login(context, payload) {
    // 调用登录接口
    const token = await login(payload)
    context.commit('SET_TOKEN', token)
  },

  // 退出登录
  logout(context) {
    context.commit('REMOVE_TOKEN')
  },

  // 获取用户信息
  async getUserInfo(context) {
    // 调用接口获取用户信息
    const res = await getUserInfo()
    context.commit('SET_USER_INFO', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
