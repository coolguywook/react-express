import * as types from 'actions/ActionTypes';
import update from 'immutability-helper';

const initialState = {
    signup: {
        status: 'INIT',
        error: -1
    }
}

export default function signupReducer(state, action) {
    if(typeof state == "undefined") {
        state = initialState;
    }

    switch (action.type) {
        case types.REQ_SIGNUP:
            return update(state, {
                signup: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.RES_SIGNUP_SUCCESS:
            return update(state, {
                signup: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.RES_SIGNUP_FAILURE:
            return update(state, {
                signup: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        default:
            return state;
    }

    return state;
}
