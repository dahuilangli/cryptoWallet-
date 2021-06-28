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


let headers: object | undefined = {
  'Content-Type': 'application/json',
  'Device': 'xxx',
  "Authorization": `Bearer xxx`,
}

export async function getTokenForApp(){
  const result = await AsyncStorage.getItem('persist:data')
  if(result != null){
    const tt = JSON.parse(result)
    return tt.token;
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
    return headers;
  }
}
export async function get(url: string, body: object, options: RequestOptions = {}) {
  const rest = await getAuth().then(data => data);

  return client.get(API_ENDPOINT + url, { params: body, headers: rest })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function post(url: string, body: object, options: RequestOptions = {}) {
  const rest = await getAuth().then(data => data);
  const { data } = await client.post(API_ENDPOINT + url, body, rest)
    .then(function (response) {
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

