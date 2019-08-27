import { combineReducers } from 'redux';

import { SET_SOCKET, ACCOUNT_CREATED, ACCOUNT_CREATED_FAIL, ACCOUNT_LOGIN, ACCOUNT_LOGIN_FAIL, GROUPS_LOADED } from '../constants/Action-types';

const socketReducer = (state = {}, action) => {
    switch (action.type) {
      case SET_SOCKET:
        return action.payload;
      default:
        return state;
    }
};

const createdAccountUsernameReducer = (state = '', action) => {
    switch (action.type) {
      case ACCOUNT_CREATED:
        return action.payload;
      default:
        return state;
    }
};

const createdAccountErrorReducer = (state = '', action) => {
    switch (action.type) {
      case ACCOUNT_CREATED_FAIL:
        return action.payload;
      default:
        return state;
    }
};

const loggedInAccountUserReducer = (state = {}, action) => {
    switch (action.type) {
      case ACCOUNT_LOGIN:
        return action.payload;
      default:
        return state;
    }
};

const loggedInAccountErrorReducer = (state = '', action) => {
    switch (action.type) {
      case ACCOUNT_LOGIN_FAIL:
        return action.payload;
      default:
        return state;
    }
};

const classesIdsReducer = (state = [null], action) => {
    switch (action.type) {
      case GROUPS_LOADED:
        return action.payload;
      default:
        return state;
    }
};

const rootReducer = combineReducers({
    classesIds: classesIdsReducer,
    createdAccountUsername: createdAccountUsernameReducer,
    createdAccountError: createdAccountErrorReducer,
    loggedInAccountUser: loggedInAccountUserReducer,
    loggedInAccountError: loggedInAccountErrorReducer,
    socket: socketReducer
});

export default rootReducer;