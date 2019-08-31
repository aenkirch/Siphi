import { GROUPS_LOADED, GROUPS_LOADED_FAIL, COURSES_LOADED, USER_CLASSES_LOADED } from '../constants/Action-types';
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

export function setCourse(payload) {
    return function(dispatch) {
        return axios.post(IP + '/api/setCourse', { 
            data : {
                name: payload.value.name,
                label: payload.value.label
            }}, { 
            headers: payload.headers 
        })
        .then((res) => {
            Alert.alert('Success !', 'Your course was created.', 
                [
                    {text: 'Great !'}
                ],
                { cancelable: false }
            )
            dispatch(getCourses(payload.headers)); // reloading courses list when created a new one
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

export function setGroup(payload) {
    return function(dispatch) {
        return axios.post(IP + '/api/setGroup', { 
            data : {
                name: payload.value.name,
                courseLabel: payload.value.courseLabel
            }}, { 
            headers: payload.headers 
        })
        .then((res) => {
            Alert.alert('Success !', 'Your group was created.', 
                [
                    {text: 'Great !'}
                ],
                { cancelable: false }
            )
            dispatch(getGroups({courseLabel: payload.value.courseLabel, headers: payload.headers}));
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

export function getCourses(payload) {
    return function(dispatch) {
        return axios.get(IP + '/api/getCourses', {
            headers: payload
        })
        .then((res) => {
            dispatch({ type: COURSES_LOADED, payload: res.data })
        })
        .catch((err) => {
            console.log(err); 
            Alert.alert('Can‘t find courses list !', err, 
                [
                    {text: 'OK'}
                ],
                { cancelable: false }
            )
            dispatch({ type: '' })
        })
}}

export function getGroups(payload) {
    return function(dispatch) {
        return axios.post(IP + '/api/getGroups', { 
            data : {
                courseLabel: payload.courseLabel
            }}, { 
            headers: payload.headers
        })
        .then((res) => {
            dispatch({ type: GROUPS_LOADED, payload: res.data })
        })
        .catch((err) => {
            console.log(err); 
            Alert.alert('Can‘t find groups list !', err, 
                [
                    {text: 'OK'}
                ],
                { cancelable: false }
            )
            dispatch({ type: '' })
        })
}}

export function getUserClasses(payload) {
    return function(dispatch) {
        return axios.get(IP + '/api/getUserClasses', {
            headers: payload
        })
        .then((res) => {
            dispatch({ type: USER_CLASSES_LOADED, payload: [10, 10] }) // TODO: replace with res.data when tests are finished
        })
        .catch((err) => {
            console.log(err); 
            Alert.alert('Can‘t find your classes !', err, 
                [
                    {text: 'OK'}
                ],
                { cancelable: false }
            )
            dispatch({ type: '' })
        })
}}