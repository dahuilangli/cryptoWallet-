import {
    ActionValue,
    createAction,
    createActions,
    NoArgAction,
    StringAction
  } from 'redux-type-actions';

import { Account, Location, User } from 'actions/types';
  

import  apis from 'apis';
const Wallet = createActions({
    setUser: createAction<User>(),
    setAccountList: createAction<Account>(),
    setLocation: createAction<Location>(),
    getUser: NoArgAction,
    getAccountList: NoArgAction,
    GET_TOKEN_SUCCESS: StringAction,
    GET_TOKEN_ERROR: NoArgAction,
  });
  
export const GET_TOKEN = ()=>async (dispath: any)=>{
  try{
  apis.common.getToken().then(data=>{
    dispath(Wallet.GET_TOKEN_SUCCESS(data.token))})
  }catch(error){
    dispath(Wallet.GET_TOKEN_ERROR())
}
}
export default Wallet;
  

