import {REQ_SIGNOUT} from './ActionTypes';
import axios from 'axios';

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
