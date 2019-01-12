// @flow
import fetch from 'cross-fetch';

export const REQUEST_ACCOUNT_TOKEN = 'REQUEST_ACCOUNT_TOKEN';
function requestAccountToken(accountName: string, symbol: string) {
  return {
    type: REQUEST_ACCOUNT_TOKEN,
    accountName,
    symbol
  };
}

export const RECEIVE_ACCOUNT_TOKEN = 'RECEIVE_ACCOUNT_TOKEN';
function receiveAccountToken(accountName: string, token: object, json) {
  return {
    type: RECEIVE_ACCOUNT_TOKEN,
    accountName,
    token,
    json,
    receivedAt: Date.now()
  };
}

export const RESET_ACCOUNT_TOKEN = 'RESET_ACCOUNT_TOKEN';
export function resetAccountToken() {
  return {
    type: RESET_ACCOUNT_TOKEN
  };
}

export const REQUEST_TOKEN_LIST = 'REQUEST_TOKEN_LIST';
function requestTokenList() {
  return {
    type: REQUEST_TOKEN_LIST
  };
}

export const RECEIVE_TOKEN_LIST = 'RECEIVE_TOKEN_LIST';
export function receiveTokenList(json) {
  return {
    type: RECEIVE_TOKEN_LIST,
    json
  };
}

export const REMOVE_ACCOUNT_TOKEN = 'REMOVE_ACCOUNT_TOKEN_FROM_STORE';
export function removeAccountTokenFromStore(
  accountName: string,
  token: object
) {
  return {
    type: REMOVE_ACCOUNT_TOKEN,
    accountName,
    token
  };
}

export function fetchTokenList() {
  return dispatch => {
    dispatch(requestTokenList());
    return fetch(
      'https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/tokens.json',
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(json => dispatch(receiveTokenList(json)));
  };
}

export function fetchAccountToken(accountName: string, token: object) {
  return dispatch => {
    dispatch(requestAccountToken(accountName));
    return fetch('https://api.eosnewyork.io/v1/chain/get_currency_balance', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: token.account,
        account: accountName,
        symbol: token.symbol
      })
    })
      .then(response => response.json())
      .then(json => dispatch(receiveAccountToken(accountName, token, json)));
  };
}