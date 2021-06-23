import {
    ActionValue,
    createAction,
    createActions,
    NoArgAction,
  } from 'redux-type-actions';
  import { User } from 'actions/types';
  
  
  const myAction = createActions({
    logout: NoArgAction,
  });

  
  export default myAction;
  