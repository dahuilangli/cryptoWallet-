import { API_ENDPOINT } from 'config/constants';
import axios from "axios";

interface RequestOptions extends RequestInit {
  timeout?: number;
}

const headers:object  = {
  headers: { 'Content-Type': 'application/json'}
}
const jwtHeaders:object  = {
  headers: {
     'Content-Type': 'application/json',
     "Authorization": 'Bearer ' + "xxxx"
    }
}

export function post(url: string, body: object, options: RequestOptions = {}) {
  return axios.post(API_ENDPOINT+url, body,headers)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function put(url: string, body: object, options: RequestOptions = {}) {
  return axios.put(API_ENDPOINT+url, body,headers)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}


export function jwtGet(url: string, body: object, options: RequestOptions = {}) {
  return axios.get(API_ENDPOINT+url, {params:body, headers: jwtHeaders})
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function jwtPost(url: string, body: object, options: RequestOptions = {}) {
  return axios.post(API_ENDPOINT+url, body,{ headers: jwtHeaders})
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function jwtPut(url: string, body: object, options: RequestOptions = {}) {
  return axios.put(API_ENDPOINT+url, body,{ headers: jwtHeaders})
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}
