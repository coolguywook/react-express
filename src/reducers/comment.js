import * as types from 'actions/ActionTypes';
import update from 'immutability-helper';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: [],
        isLast: false
    }
};

export default function comment(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch (action.type) {
        case types.ADD_COMMENT:
            return update(state, {
                post: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.ADD_COMMENT_SUCCESS:
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.ADD_COMMENT_FAILURE:
            return update(state, {
                post: {
                    status: { $set: "FAILURE" },
                    error: { $set: action.error }
                }
            });
        case types.GET_COMMENTLIST:
            return update(state, {
                list: {
                    status: { $set: 'WAITIMG' }
                }
            });
        case types.GET_COMMENTLIST_SUCCESS:
            if(action.isInitial) {
                return update(state, {
                    list: {
                        status: { $set: 'SUCCESS' },
                        data: { $set: action.data },
                        isLast: { $set: action.data.length < 6 }
                    }
                })
            } else {
                if(action.listType === 'new') {
                    return update(state, {
                        list: {
                            status: { $set: 'SUCCESS' },
                            data: { $unshift: action.data }
                        }
                    });
                } else {
                    return update(state, {
                        list: {
                            status: { $set: 'SUCCESS' },
                            data: { $push: action.data },
                            isLast: { $set: action.data.length < 6 }
                        }
                    });
                }
            }

            return state;
        case types.GET_COMMENTLIST_FAILURE:
            return update(state, {
                list: {
                    status: { $set: 'FAILURE' }
                }
            });
        default:
            return state;
    }

    return state;
}
