import {
    ADD_COMMENT,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    GET_COMMENTLIST,
    GET_COMMENTLIST_SUCCESS,
    GET_COMMENTLIST_FAILURE,
    UPDATE_COMMENT,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAILURE,
    DEL_COMMENT,
    DEL_COMMENT_SUCCESS,
    DEL_COMMENT_FAILURE,
    REQ_STAR,
    REQ_STAR_SUCCESS,
    REQ_STAR_FAILURE
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
            url = isInitial ? `${url}/${username}` : `${url}/${username}/${listType}/${id}`;
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

export function requestUpdateComment(id, index, contents) {
  return (dispatch) => {
    dispatch(updateComment());

    return axios.put('/api/comment/' + id, { contents })
      .then((response) => {
        dispatch(updateCommentSuccess(index, response.data.comment));
      }).catch((error) => {
        dispatch(updateCommentFailure(error.response.data.code));
      });
  };
}

export function updateComment() {
  return {
    type: UPDATE_COMMENT
  };
}

export function updateCommentSuccess(index, comment) {
  return {
    type: UPDATE_COMMENT_SUCCESS,
    index,
    comment
  };
}

export function updateCommentFailure(error) {
  return {
    type: UPDATE_COMMENT_FAILURE,
    error
  };
}

export function requestRemoveComment(id, index) {
  return (dispatch) => {
    dispatch(removeComment());
    return axios.delete('/api/comment/' + id)
      .then((response) => {
        dispatch(removeCommentSuccess(index));
      }).catch((error) => {
        dispatch(removeCommentFailure(error.response.data.code));
      });
  };
}

export function removeComment() {
  return {
    type: DEL_COMMENT
  };
}

export function removeCommentSuccess(index) {
  return {
    type: DEL_COMMENT_SUCCESS,
    index
  };
}

export function removeCommentFailure(error) {
  return {
    type: DEL_COMMENT_FAILURE,
    error
  }
}

export function requestCommentStar(id, index) {
  return (dispatch) => {
    dispatch(commentStar());
    return axios.post('/api/comment/star/' + id)
      .then((response) => {
        dispatch(commentStarSuccess(index, response.data.comment));
      }).catch((error) => {
        dispatch(commentStarFailure(error.response.data.code));
      });
  }
}

export function commentStar() {
  return {
    type: REQ_STAR
  }
}

export function commentStarSuccess(index, comment) {
  return {
    type: REQ_STAR_SUCCESS,
    comment,
    index
  }
}

export function commentStarFailure(error) {
  return {
    type: REQ_STAR_FAILURE,
    error
  }
}
