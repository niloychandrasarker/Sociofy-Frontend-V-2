import {
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  GET_POPULAR_USERS_REQUEST,
  GET_POPULAR_USERS_SUCCESS,
  GET_POPULAR_USERS_FAILURE,
} from "./user.actionType";

const initialState = {
  users: [],
  searchResults: [],
  popularUsers: [],
  selectedUser: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERS_REQUEST:
    case GET_USER_BY_ID_REQUEST:
    case FOLLOW_USER_REQUEST:
    case GET_POPULAR_USERS_REQUEST:
      return { ...state, loading: true, error: null };

    case SEARCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
        error: null,
      };

    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedUser: action.payload,
        error: null,
      };

    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        popularUsers: state.popularUsers.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        error: null,
      };

    case GET_POPULAR_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        popularUsers: action.payload,
        error: null,
      };

    case SEARCH_USERS_FAILURE:
    case GET_USER_BY_ID_FAILURE:
    case FOLLOW_USER_FAILURE:
    case GET_POPULAR_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};