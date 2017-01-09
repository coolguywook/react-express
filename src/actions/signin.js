import {REQ_SIGNIN, REQ_SIGNIN_SUCCESS, REQ_SIGNIN_FAILURE} from './ActionTypes';
import axios from 'axios';

export function signin() {
    return {type: REQ_SIGNIN}
}

export function signinSuccess(username) {
    return {type: REQ_SIGNIN_SUCCESS, username}
}

export function signinFailure() {
    return {type: REQ_SIGNIN_FAILURE};
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
