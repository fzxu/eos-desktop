// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import accountInfo from './accountInfo';
import accountActions from './accountActions';
import pagination from './pagination';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    accountInfo,
    accountActions,
    pagination
  });
}
