import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_USER_POSTS_REQUEST,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
} from "./post.actionType";

const initialState = {
  posts: [],
  userPosts: [],
  loading: false,
  error: null,
  newPost: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case GET_ALL_POSTS_REQUEST:
    case GET_USER_POSTS_REQUEST:
    case LIKE_POST_REQUEST:
    case CREATE_COMMENT_REQUEST:
    case DELETE_POST_REQUEST:
    case SAVE_POST_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts],
        newPost: action.payload,
        error: null,
      };

    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null,
      };

    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        userPosts: action.payload,
        error: null,
      };

    case LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
        error: null,
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
        error: null,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== action.payload),
        userPosts: state.userPosts.filter((post) => post.id !== action.payload),
        error: null,
      };

    case SAVE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
        error: null,
      };

    case CREATE_POST_FAILURE:
    case GET_ALL_POSTS_FAILURE:
    case GET_USER_POSTS_FAILURE:
    case LIKE_POST_FAILURE:
    case CREATE_COMMENT_FAILURE:
    case DELETE_POST_FAILURE:
    case SAVE_POST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};