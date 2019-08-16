import { GROUPS_LOADED, GROUPS_LOADED_FAIL } from '../constants/Action-types';
import { IP } from '../constants/config';

import { Alert } from 'react-native';
import axios from 'axios';

export function setForm(payload) {
    return function(dispatch) {
      return axios({
        method: 'POST',
        url: IP + '/api/setForm',
        headers: payload.headers,
        data: {
            question: payload.value.question,
            answer1: payload.value.answer1,
            answer2: payload.value.answer2,
            answer3: payload.value.answer3,
            answer4: payload.value.answer4,
            answer5: payload.value.answer5
        }})
      .then((res) => {
        Alert.alert('Success !', 'Your form was created.', 
            [
                {text: 'Great !'}
            ],
            { cancelable: false }
        )
        dispatch({ type: '' })
      })
      .catch((err) => {
        console.log(err); 
        Alert.alert('Error !', err, 
            [
                {text: 'OK'}
            ],
            { cancelable: false }
        )
        dispatch({ type: '' })
      })
    }
};

export function getGroups(headers) {
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
)}}