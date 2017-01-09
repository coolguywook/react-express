import { REQ_STATUS, RES_STATUS_SUCCESS, RES_STATUS_FAILURE } from './ActionTypes';
import axios from 'axios';

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
                dispatch(getStatusSuccess(response.data.loginInfo.username));
            }).catch((err) => {
                dispatch(getStatusFailure());
            })
    };
}
