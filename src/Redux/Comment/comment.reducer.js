import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE,
  GET_COMMENT_BY_ID_REQUEST,
  GET_COMMENT_BY_ID_SUCCESS,
  GET_COMMENT_BY_ID_FAILURE,
  GET_POST_COMMENTS_REQUEST,
  GET_POST_COMMENTS_SUCCESS,
  GET_POST_COMMENTS_FAILURE,
} from "./comment.actionType";

const initialState = {
  comments: [],
  postComments: {},
  selectedComment: null,
  loading: false,
  error: null,
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
    case LIKE_COMMENT_REQUEST:
    case GET_COMMENT_BY_ID_REQUEST:
    case GET_POST_COMMENTS_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [action.payload, ...state.comments],
        error: null,
      };

    case LIKE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
        error: null,
      };

    case GET_COMMENT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedComment: action.payload,
        error: null,
      };

    case GET_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        postComments: {
          ...state.postComments,
          [action.payload.postId]: action.payload.comments,
        },
        error: null,
      };

    case CREATE_COMMENT_FAILURE:
    case LIKE_COMMENT_FAILURE:
    case GET_COMMENT_BY_ID_FAILURE:
    case GET_POST_COMMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};