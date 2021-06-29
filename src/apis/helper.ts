import { API_ENDPOINT } from 'config/constants';
import axios from "axios";
import DeviceInfo from 'react-native-device-info';


import AsyncStorage from '@react-native-community/async-storage';

interface RequestOptions extends RequestInit {
  timeout?: number;
}
const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL: API_ENDPOINT,
  responseType: 'json'
});

// request拦截器
client.interceptors.request.use(config => {
  // 是否需要设置 token
  // const isToken = (config.headers || {}).isToken === false
  // if (getToken() && !isToken) {
  //   config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof(value) !== "undefined") {
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


let headers: object | undefined = {
  'Content-Type': 'application/json',
  'Device': 'xxx',
  "Authorization": `Bearer xxx`,
}

export async function getTokenForApp(){
  const result = await AsyncStorage.getItem('persist:data')
  if(result != null){
    const tt = JSON.parse(result)
    return tt.token == "" ? null : tt.token;
  }
  return null;
}
async function getAuth() {
  const Authorization = await getTokenForApp();
  if (Authorization) {
    headers = {
      'Content-Type': 'application/json',
      'Device': DeviceInfo.getUniqueId(),
      "Authorization": `Bearer ${JSON.parse(Authorization)}`,
    }
    console.log('====================================');
    console.log(DeviceInfo.getUniqueId());
    console.log('====================================');
  }
  return headers;
}
export async function get(url: string, params: object, options: RequestOptions = {}) {
  const rest = await getAuth().then(data => data);

  return client.get(API_ENDPOINT + url, { params, headers: rest })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function post(url: string, body: object, options: RequestOptions = {}) {
 
  const rest = await getAuth().then(data => data);
  const  data  = await client.post(API_ENDPOINT + url, body, {headers:rest})
    .then(function (response) {
      console.log(response.data);
      
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
}

export function put(url: string, body: object, options: RequestOptions = {}) {
  return client.put(API_ENDPOINT + url, body, headers)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

