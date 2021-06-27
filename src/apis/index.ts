import * as common from './common'
import { API_ENDPOINT } from 'config/constants';
import axios from "axios";


const headers:object  = {
    headers: { 'Content-Type': 'application/json'}
  }
  const jwtHeaders:object  = {
    headers: {
       'Content-Type': 'application/json',
       "Authorization": 'Bearer ' + "xxxx"
      }
  }
export const client =  axios.create({ 
    baseURL:API_ENDPOINT,
    responseType: 'json'
  });

const apis = {common}

export default apis;