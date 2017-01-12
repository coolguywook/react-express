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
    },
    edit: {
      status: 'INIT',
      error: -1
    },
    remove: {
      status: 'INIT',
      error: -1
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
            }

            if(action.listType === 'new') {
                return update(state, {
                    list: {
                        status: { $set: 'SUCCESS' },
                        data: { $unshift: action.data }
                    }
                });
            }

            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    data: { $push: action.data },
                    isLast: { $set: action.data.length < 6 }
                }
            });
        case types.GET_COMMENTLIST_FAILURE:
            return update(state, {
                list: {
                    status: { $set: 'FAILURE' }
                }
            });
        case types.UPDATE_COMMENT:
            return update(state, {
                edit: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 },
                    comment: { $set: undefined }
                }
            });
        case types.UPDATE_COMMENT_SUCCESS:
            return update(state, {
                edit: {
                    status: { $set: 'SUCCESS' },
                },
                list: {
                    data: {
                        [action.index]: { $set: action.comment }
                    }
                }
            });
        case types.UPDATE_COMMENT_FAILURE:
            return update(state, {
                edit: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        case types.DEL_COMMENT:
            return update(state, {
                remove: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.DEL_COMMENT_SUCCESS:
            return update(state, {
                remove:{
                    status: { $set: 'SUCCESS' }
                },
                list: {
                    data: { $splice: [[action.index, 1]] }
                }
            });
        case types.DEL_COMMENT_FAILURE:
            return update(state, {
                remove: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        default:
            return state;
    }

    return state;
}
