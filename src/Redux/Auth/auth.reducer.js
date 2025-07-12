import {
    GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS, // <-- Make sure this is imported!
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./auth.actionType";

const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_PROFILE_SUCCESS:
      return { ...state, user: action.payload, error: null, loading: false };

    case UPDATE_PROFILE_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        jwt: action.payload,
        loading: false,
        //user: action.payload,
        error: null,
      };

    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
