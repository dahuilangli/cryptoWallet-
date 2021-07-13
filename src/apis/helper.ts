import axios from "axios";
import { API_ENDPOINT } from 'config/constants';
import { getToken, getLanguage ,getCurrency } from 'reducers/dataStateReducer';
import { ReduxStore } from 'store';
import DeviceInfo from 'react-native-device-info';
import errorCode from './errorCode.json'
import { Alert } from "react-native";
import { DevSettings } from "react-native";
import { show } from "utils";

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

  // console.log('====================================');
  // console.log(config.headers);
  // console.log('====================================');
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
  Promise.reject(error.data)
})

// 响应拦截器
client.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  // console.log('=======状态码================');
  // console.log(res.data.code);
  // console.log(res.data);
  // console.log(res.data.msg);
  // console.log('====================================');
  const code: any = res.data.code || 200;
  // 获取错误信息
  
  const msg = errorCode[code] || res.data.msg || errorCode['default']
  if (code === '401') {
    Alert.alert(
      '提示',
      '登录状态已过期，您可以继续留在该页面，或者重新启动',
      [
        {
          text: '是',
          onPress: async () => {
            try {
              DevSettings.reload()
            } catch (err) {
              Alert.alert('提示', '重启失败，请手动重启');
            }
          },
        },
        { text: '否' },
      ],
    );
  } else if (code === '500') {
    Alert.alert(msg)
    return Promise.reject(new Error(msg))
  } else if (code !== '200') {
    Alert.alert(msg)
    return Promise.reject('error')
  } else {
    return res.data
  }
},
error => {
  console.log('err' + error)
  let { message } = error;
  if (message == "Network Error") {
    message = "后端接口连接异常";
  }
  else if (message.includes("timeout")) {
    message = "系统接口请求超时";
  }
  else if (message.includes("Request failed with status code")) {
    message = "系统接口" + message.substr(message.length - 3) + "异常";
  }
  Alert.alert(message)
  return Promise.reject(error)
}
)

export function get(url: string, params: object) {
  return new Promise((resolve, reject) => {
    client.get(API_ENDPOINT + url, { params })
      .then(res => {
        console.log(res);
        
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
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
        reject(err)
      })
  })
}