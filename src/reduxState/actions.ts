import {
  ActionValue,
  createAction,
  createActions,
  NoArgAction,
} from 'redux-type-actions';
import { Account, Location, User } from 'types/types';

const actions = createActions({
  // Data
  setUser: createAction<User>(),
  setLocation: createAction<Location>(),
  logout: NoArgAction,
  setAccountList: createAction<Account>(),
});

export type Action = ActionValue<typeof actions>;

export default actions;
