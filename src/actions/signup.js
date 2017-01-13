import {REQ_SIGNUP, RES_SIGNUP_SUCCESS, RES_SIGNUP_FAILURE} from './ActionTypes';
import axios from 'axios';

export function signup() {
    return {type: REQ_SIGNUP}
}

export function signupSuccess() {
    return {type: RES_SIGNUP_SUCCESS}
}

export function signupFailure(error) {
    return {type: RES_SIGNUP_FAILURE, error}
}

export function requestSignup(data) {
    return (dispatch) => {
        dispatch(signup());

        return axios.post('/api/account/signup', data)
        .then((response) => {
            dispatch(signupSuccess());
        }).catch((error) => {
            dispatch(signupFailure(error.response.data.code));
        });
    };
}
