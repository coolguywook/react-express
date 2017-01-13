import * as types from 'actions/ActionTypes';
import update from 'immutability-helper';

const initialState = {
    signin: {
        status: 'INIT'
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: '',
        roles: []
    }
}

export default function authentication(state, action) {
    if (typeof state == "undefined") {
        state = initialState;
    }

    switch (action.type) {
        case types.REQ_SIGNIN:
            return update(state, {
                signin: {
                    status: {
                        $set: 'WAITING'
                    }
                }
            });
        case types.RES_SIGNIN_SUCCESS:
            return update(state, {
                signin: {
                    status: {
                        $set: 'SUCCESS'
                    }
                },
                status: {
                    isLoggedIn: {
                        $set: true
                    },
                    currentUser: {
                        $set: action.username
                    },
                    roles: {
                        $set: action.roles
                    }
                }
            });
        case types.RES_SIGNIN_FAILURE:
            return update(state, {
                signin: {
                    status: {
                        $set: 'FAILURE'
                    }
                }
            });
        case types.REQ_STATUS:
            return update(state, {
                status: {
                    isLoggedIn: {
                        $set: true
                    }
                }
            });
        case types.RES_STATUS_SUCCESS:
            return update(state, {
                status: {
                    valid: {
                        $set: true
                    },
                    currentUser: {
                        $set: action.username
                    }
                }
            });
        case types.RES_STATUS_FAILURE:
            return update(state, {
                status: {
                    valid: {
                        $set: false
                    },
                    isLoggedIn: {
                        $set: false
                    }
                }
            });
        case types.REQ_SIGNOUT:
            return update(state, {
                status: {
                    isLoggedIn: { $set: false },
                    currentUser: { $set: '' }
                }
            });
        default:
            return state;
    }

    return state;
}
