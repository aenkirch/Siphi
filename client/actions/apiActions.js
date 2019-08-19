import { GROUPS_LOADED, GROUPS_LOADED_FAIL } from '../constants/Action-types';
import { IP } from '../constants/config';

import { Alert } from 'react-native';
import axios from 'axios';

export function setForm(payload) {
    return function(dispatch) {
        return axios.post(IP + '/api/setForm', { 
            data : {
                question: payload.value.question,
                answer1: payload.value.answer1,
                answer2: payload.value.answer2,
                answer3: payload.value.answer3,
                answer4: payload.value.answer4,
                answer5: payload.value.answer5
            }}, { 
            headers: payload.headers 
        })
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

export function getGroups(payload) {
    return function(dispatch) {
        return axios.get(IP + '/api/getGroups', {
            headers: payload
        })
        .then((res) => {
            console.log(res);
            dispatch({ type: '' })
        })
        .catch((err) => {
            console.log(err); 
            dispatch({ type: '' })
        })
}}