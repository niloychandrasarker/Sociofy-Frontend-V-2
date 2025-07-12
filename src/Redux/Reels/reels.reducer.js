import {
  CREATE_REEL_REQUEST,
  CREATE_REEL_SUCCESS,
  CREATE_REEL_FAILURE,
  GET_ALL_REELS_REQUEST,
  GET_ALL_REELS_SUCCESS,
  GET_ALL_REELS_FAILURE,
  GET_USER_REELS_REQUEST,
  GET_USER_REELS_SUCCESS,
  GET_USER_REELS_FAILURE,
  LIKE_REEL_REQUEST,
  LIKE_REEL_SUCCESS,
  LIKE_REEL_FAILURE,
} from "./reels.actionType";

const initialState = {
  reels: [],
  userReels: [],
  loading: false,
  error: null,
  newReel: null,
};

export const reelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REEL_REQUEST:
    case GET_ALL_REELS_REQUEST:
    case GET_USER_REELS_REQUEST:
    case LIKE_REEL_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_REEL_SUCCESS:
      return {
        ...state,
        loading: false,
        reels: [action.payload, ...state.reels],
        newReel: action.payload,
        error: null,
      };

    case GET_ALL_REELS_SUCCESS:
      return {
        ...state,
        loading: false,
        reels: action.payload,
        error: null,
      };

    case GET_USER_REELS_SUCCESS:
      return {
        ...state,
        loading: false,
        userReels: action.payload,
        error: null,
      };

    case LIKE_REEL_SUCCESS:
      return {
        ...state,
        loading: false,
        reels: state.reels.map((reel) =>
          reel.id === action.payload.id ? action.payload : reel
        ),
        error: null,
      };

    case CREATE_REEL_FAILURE:
    case GET_ALL_REELS_FAILURE:
    case GET_USER_REELS_FAILURE:
    case LIKE_REEL_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};