import axios from "axios";
import { API_ENDPOINT } from 'config/constants';
import { getToken, getLanguage ,getCurrency } from 'reducers/dataStateReducer';
import { ReduxStore } from 'store';
import DeviceInfo from 'react-native-device-info';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL: API_ENDPOINT,
  responseType: 'json',
  timeout: (10000 * 6) * 10
});
// request拦截器
client.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  

  if (getToken(ReduxStore.getState()) && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken(ReduxStore.getState()) // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['Device'] = DeviceInfo.getUniqueId()
    
  }
  config.headers['RateUnit'] = getCurrency(ReduxStore.getState())
  config.headers['Language'] = getLanguage(ReduxStore.getState())

  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof (value) !== "undefined") {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

export function get(url: string, params: object) {
  return new Promise((resolve, reject) => {
    client.get(API_ENDPOINT + url, { params })
      .then(res => {
        // console.log('====================================');
        // console.log(res);
        // console.log('====================================');
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function post(url: string, params: object) {
  return new Promise((resolve, reject) => {
    client.post(API_ENDPOINT + url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}