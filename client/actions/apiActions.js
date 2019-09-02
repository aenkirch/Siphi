import { GROUPS_LOADED, COURSES_LOADED, FORMS_AVAILABLE, INFOS_ABOUT_MY_GROUPS } from '../constants/Action-types';
import { IP } from '../constants/config';

import { Alert } from 'react-native';
import axios from 'axios';

import store from '../store/index';

export function setForm(payload) {
    return function(dispatch) {
        return axios.post(IP + '/api/setForm', { 
            data : {
                question: payload.value.question,
                answer1: payload.value.answer1,
                answer2: payload.value.answer2,
                answer3: payload.value.answer3,
                answer4: payload.value.answer4,
                answer5: payload.value.answer5,
                selectedGroup: store.getState().selectedGroup,
                selectedCourse: store.getState().selectedCourse
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
            dispatch({ type: '' })
        })
}}

export function getAvailableForms(payload) {
    return async function(dispatch) {
        return await axios.get(IP + '/api/getAvailableForms', {
            headers: payload
        })
        .then((res) => {
            dispatch({ type: FORMS_AVAILABLE, payload: res.data })
        })
        .catch((err) => {
            console.log(err); 
            dispatch({ type: '' })
        })
}}

export function getInfosAboutGroups(payload) {
    return async function(dispatch) {
        return await axios.get(IP + '/api/getInfosAboutGroups', {
            headers: payload
        })
        .then((res) => {
            dispatch({ type: INFOS_ABOUT_MY_GROUPS, payload: res.data })
        })
        .catch((err) => {
            console.log(err); 
            dispatch({ type: '' })
        })
}}

export function answerForm(payload) {
    return function(dispatch) {
        return axios.post(IP + '/api/answerForm', { 
            data : {
                formId: payload.value.formId,
                submittedAnswer: payload.value.submittedAnswer
            }}, { 
            headers: payload.headers
        })
        .then((res) => {
            Alert.alert('Success !', 'Your answer was submitted to the teacher.', 
                [
                    {text: 'Great !'}
                ],
                { cancelable: false }
            )
            dispatch({ type: '' })
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: '' })
        })
}}

export function getTopics(payload){
    return function(dispatch) {
        console.log(payload);
        return axios.get(IP + '/api/getTopics', {
            headers: payload
        })
        .then((res) => {
            dispatch({ type: '' });
            return res.data
        })
        .catch((err) => {
            console.log(err); 
            dispatch({ type: '' });
        })

///5d6b8f70ba682b0b55a2693a
}}

export function SetTopic(payload){
    return function(dispatch){
        return axios({
            method: 'POST',
            url: IP + '/api/setTopic',
            headers: payload.headers,
            data: {
                topic:payload.topicname
            }
        }).then((res) => {
            dispatch({ type: '' })
          })
          .catch((err) => {
            console.log(err.request); 
            Alert.alert('Error !', err, 
                [
                    {text: 'OK'}
                ],
                { cancelable: false }
            )
            dispatch({ type: '' })
          })
    }
}

export function setComments(payload){
    return function(dispatch){
        return axios({
            method: 'POST',
            url: IP + '/api/setComment',
            headers: payload.headers,
            data: {
                date:payload.today,
                comment:payload.com,
                topic:payload.topic
            }
        }).then((res) => {
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
}


export function getComments(payload){
    return function(dispatch){
        return axios.get(IP + '/api/getComments/'+payload.top,{
            headers: payload.headers
        })
        .then((res) => {
            dispatch({type: ''});
            return res.data
        })
        .catch((err) => {
            console.log(err);
            dispatch({type:''});
        })
    }
}