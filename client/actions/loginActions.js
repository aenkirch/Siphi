import { SET_SOCKET, ACCOUNT_CREATED, ACCOUNT_CREATED_FAIL, ACCOUNT_LOGIN, ACCOUNT_LOGIN_FAIL } from '../constants/Action-types';
import { IP } from '../constants/config';

import axios from 'axios';

export function setSocket(payload) {
  return { type: SET_SOCKET, payload }
};

export function createAccount(payload) {
    return function(dispatch) {
      return axios.post(IP + '/register', {
        username: payload.username,
        password: payload.password,
        isTeacher: payload.teacherAccount
      })
      .then((res) => {
        dispatch({ type: ACCOUNT_CREATED, payload: res.data.username })
      })
      .catch((err) => {
        console.log(err.response.data); 
        dispatch({ type: ACCOUNT_CREATED_FAIL, payload: err.response.data })
      })
    }
};

export function loginAccount(payload) {
  return function(dispatch) {
    return axios.post(IP + '/login', {
      username: payload.username,
      password: payload.password
    })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: ACCOUNT_LOGIN, payload: res.data })
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ACCOUNT_LOGIN_FAIL, payload: err.response.data })
    })
  }
}