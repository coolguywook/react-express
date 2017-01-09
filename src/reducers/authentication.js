import * as types from 'actions/ActionTypes';
import update from 'immutability-helper';

const initialState = {
  signin: {
    status: 'INIT'
  },
  status: {
    isLoggedIn: false,
    currentUser: '',
  }
}

export default function authentication(state, action) {
  if(typeof state == "undefined") {
    state = initialState;

    switch (action.type) {
      case types.REQ_SIGNIN:
        return update(state, {
          signin: {
            status: { $set: 'WAITING'}
          }
        });
      case types.REQ_SIGNIN_SUCCESS:
        return update(state, {
          signin: {
            status: { $set: 'SUCCESS'}
          },
          status: {
            isLoggedIn: { $set: true },
            currentUser: { $set: action.username }
          }
        });
      case types.AUTH_SIGNIN_FAILURE:
        return update(state, {
            signin: {
                status: { $set: 'FAILURE' }
            }
        });
      default:
        return state;
    }

  }

  return state;
}
