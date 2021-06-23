import {
    createAction,
    createActions,
  } from 'redux-type-actions';

import { Account, Location, User } from 'actions/types';
  
const walletAction = createActions({
    setUser: createAction<User>(),
    setAccountList: createAction<Account>(),
    setLocation: createAction<Location>(),
  });

  
  export default walletAction;
  

