import * as common from './common'
import { API_ENDPOINT } from 'config/constants';
import axios from "axios";


const headers:object  = {
    headers: { 'Content-Type': 'application/json'}
  }
  
let Authorization : string| null = "";
(async function getAuth(){
    Authorization =  await common.getTokenForApp();
})()
const jwtHeaders:object  = {
    headers: {
       'Content-Type': 'application/json',
       "Authorization": 'Bearer ' + Authorization
      }
  };
console.log(jwtHeaders);
console.log(111111);
export const client =  axios.create({ 
    baseURL:API_ENDPOINT,
    responseType: 'json'
  });

const apis = {common}

export default apis;