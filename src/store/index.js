import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 默认数据
const state = {
  // 要设置的全局访问的state对象
  user: JSON.parse(sessionStorage.getItem('user')) || {
    access_token: ''
  }
}

const getters = {
  // 实时监听state值的变化(最新状态)
  isShow (state) {
    // 承载变化的user的值
    return state.user
  },
  getChangedNum () {
    // 承载变化的changebleNum的值
    return state.changableNum
  }
}
const mutations = {
  setUser (state, data) {
    // 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.user = data
    sessionStorage.setItem('user', JSON.stringify(data))
  },
  del (state) {
    // 同上
    state.user = {}
  }
}

const actions = {
  hideFooter (context) {
    // 自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('hide')
  },
  setUser (context, data) {
    // 同上注释
    context.commit('setUser', data)
  },
  userDel (context, data) {
    // 删除
    context.commit('del')
  }
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
export default store
