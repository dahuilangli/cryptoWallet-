import {
    ActionValue,
    createAction,
    createActions,
    NoArgAction
  } from 'redux-type-actions';

import { Account, Location, User } from 'actions/types';
  

const Wallet = createActions({
    setUser: createAction<User>(),
    setAccountList: createAction<Account>(),
    setLocation: createAction<Location>(),
    getUser: NoArgAction,
    getAccountList: NoArgAction,
    getToken: NoArgAction,
  });
  
export default Wallet;
  

