import axios from 'axios'
import { Toast } from 'vant'
import Qs from 'qs'
import store from '../store'
let method = ''
axios.interceptors.request.use(
  config => {
    Toast.loading({
      mask: true,
      message: '加载中...'
    })
    method = config.method
    return config
  },
  err => {
    Toast('请求超时!')
    return Promise.resolve(err)
  }
)
axios.interceptors.response.use(
  data => {
    if (method !== 'OPTIONS') {
      let dataBox = data.data
      Toast.clear()
      if (dataBox.status !== 1) {
        Toast(dataBox.msg)
      }
      return data
    }
  },
  err => {
    if (err.response.status === 504 || err.response.status === 404) {
      Toast('服务器被吃了⊙﹏⊙∥')
    } else if (err.response.status === 403) {
      Toast('权限不足,请联系管理员!')
    } else {
      Toast(err.response.msg)
      //   console.log(err)
    }
    return Promise.resolve(err)
  }
)
let url = window.location.href
let base = ''
if (url.indexOf('m.') === -1) {
  base = '/apiBox/muser/'
} else {
  base = 'http://user.youshantui.258.com/muser/'
}
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: Qs.stringify(params),
    headers: {
      Authorization: store.state.user.access_token
    }
  })
}
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    headers: {
      Authorization: store.state.user.access_token
    }
  })
}

export const putRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      Authorization: store.state.user.access_token
    }
  })
}
export const deleteRequest = url => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  })
}
