import {
    REQ_SIGNIN,
    RES_SIGNIN_SUCCESS,
    RES_SIGNIN_FAILURE,
    REQ_SIGNOUT,
    REQ_STATUS,
    RES_STATUS_SUCCESS,
    RES_STATUS_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function signin() {
    return {type: REQ_SIGNIN}
}

export function signinSuccess(username) {
    return {type: RES_SIGNIN_SUCCESS, username}
}

export function signinFailure() {
    return {type: RES_SIGNIN_FAILURE};
}

export function requestSignin(username, password) {
    return (dispatch) => {
        dispatch(signin());
        return axios.post('/api/account/signin', {username, password})
          .then((response) => {
              dispatch(signinSuccess(username));
          }).catch((error) => {
              dispatch(signinFailure());
        });

    }
}

export function signout() {
    return {
        type: REQ_SIGNOUT
    };
}

export function requestSignout() {
    return (dispatch) => {
        return axios.post('/api/account/signout')
            .then((response) => {
                dispatch(signout());
            });
    };
}

export function getStatus() {
    return {
        type: REQ_STATUS
    };
}

export function getStatusSuccess(username) {
    return {
        type: RES_STATUS_SUCCESS,
        username
    };
}

export function getStatusFailure() {
    return {
        type: RES_STATUS_FAILURE
    };
}

export function getStatusRequest() {
    return (dispatch) => {
        dispatch(getStatus());

        return axios.get('/api/account/getInfo')
            .then((response) => {
                dispatch(getStatusSuccess(response.data.info.username));
            }).catch((err) => {
                dispatch(getStatusFailure());
            })
    };
}
