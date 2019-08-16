import { FORM_CREATED, FORM_CREATED_FAIL, GROUPS_LOADED, GROUPS_LOADED_FAIL } from '../constants/Action-types';
import { IP } from '../constants/config';

import axios from 'axios';

export function setForm(payload, headers) {
    return function(dispatch) {
      return axios({
        method: 'POST',
        url: IP + '/api/setForm',
        headers: headers,
        data: {
            question: payload.question,
            answer1: payload.answer1,
            answer2: payload.answer2,
            answer3: payload.answer3,
            answer4: payload.answer4,
            answer5: payload.answer5
        }})
      .then((res) => {
        dispatch({ type: FORM_CREATED, payload: res.data })
      })
      .catch((err) => {
        console.log(err.response.data); 
        dispatch({ type: FORM_CREATED_FAIL, payload: err.response.data })
      })
    }
};

export function getGroups(payload, headers) {
    return function(dispatch) {
        return axios({
            method: 'POST',
            url: IP + '/api/getGroups',
            headers: headers
        .then((res) => {
            dispatch({ type: GROUPS_LOADED, payload: res.data })
        })
        .catch((err) => {
            console.log(err.response.data); 
            dispatch({ type: GROUPS_LOADED_FAIL, payload: err.response.data })
        })
    }
};