import {
    createActions,
    NoArgAction,
  } from 'redux-type-actions';
  
  
  const myAction = createActions({
    logout: NoArgAction,
  });

  
  export default myAction;
  