import { combineReducers } from 'redux';

import { SET_SOCKET, ACCOUNT_CREATED, ACCOUNT_CREATED_FAIL, ACCOUNT_LOGIN, ACCOUNT_LOGIN_FAIL, GROUPS_LOADED, COURSES_LOADED, USER_CLASSES_LOADED, COURSE_SELECTED, GROUP_SELECTED, GROUPS_RESET } from '../constants/Action-types';

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

const classesIdsReducer = (state = [], action) => {
    switch (action.type) {
      case USER_CLASSES_LOADED:
        return action.payload;
      default:
        return state;
    }
};

const coursesReducer = (state = [], action) => {
  switch (action.type) {
    case COURSES_LOADED:
      return action.payload;
    default:
      return state;
  }
};

const groupsReducer = (state = [], action) => {
  switch (action.type) {
    case GROUPS_LOADED:
      return action.payload;
    case GROUPS_RESET:
      return action.payload;
    default:
      return state;
  }
};

const selectedCourseReducer = (state = '', action) => {
  switch (action.type) {
    case COURSE_SELECTED:
      return action.payload;
    default:
      return state;
  }
};

const selectedGroupReducer = (state = '', action) => {
  switch (action.type) {
    case GROUP_SELECTED:
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
    socket: socketReducer,
    courses: coursesReducer,
    groups: groupsReducer,
    selectedGroup: selectedGroupReducer,
    selectedCourse: selectedCourseReducer
});

export default rootReducer;