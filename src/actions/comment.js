import {
    ADD_COMMENT,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    GET_COMMENTLIST,
    GET_COMMENTLIST_SUCCESS,
    GET_COMMENTLIST_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function requestAddComment(contents) {
    return (dispatch) => {
        dispatch(addComment());

        return axios.post('/api/comment/', { contents })
            .then((response) => {
                dispatch(addCommentSuccess());
            }).catch((error) => {
                dispatch(addCommentFailure(error.response.data.code));
            });
    };
}

export function addComment() {
    return {
        type: ADD_COMMENT
    };
}

export function addCommentSuccess() {
    return {
        type: ADD_COMMENT_SUCCESS
    };
}

export function addCommentFailure(error) {
    return {
        type: ADD_COMMENT_FAILURE,
        error
    }
}

export function requestCommentList(isInitial, listType, id, username) {
    return (dispatch) => {
        dispatch(commentList());

        let url = '/api/comment';

        if(typeof username === "undefined") {
            url = isInitial ? url : `${url}/${listType}/${id}`;
        } else {
            //
        }

        return axios.get(url).then((response) => {
            dispatch(commentListSuccess(response.data, isInitial, listType));
        }).catch((error) => {
            dispatch(commentListFailure());
        })
    };
}

export function commentList() {
    return {
        type: GET_COMMENTLIST
    };
}

export function commentListSuccess(data, isInitial, listType) {
    return {
        type: GET_COMMENTLIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function commentListFailure() {
    return {
        type: GET_COMMENTLIST_FAILURE
    };
}
