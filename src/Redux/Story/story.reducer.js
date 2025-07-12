import {
  CREATE_STORY_REQUEST,
  CREATE_STORY_SUCCESS,
  CREATE_STORY_FAILURE,
  GET_USER_STORIES_REQUEST,
  GET_USER_STORIES_SUCCESS,
  GET_USER_STORIES_FAILURE,
  GET_ALL_STORIES_REQUEST,
  GET_ALL_STORIES_SUCCESS,
  GET_ALL_STORIES_FAILURE,
} from "./story.actionType";

const initialState = {
  stories: [],
  userStories: [],
  loading: false,
  error: null,
  newStory: null,
};

export const storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STORY_REQUEST:
    case GET_USER_STORIES_REQUEST:
    case GET_ALL_STORIES_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_STORY_SUCCESS:
      return {
        ...state,
        loading: false,
        stories: [action.payload, ...state.stories],
        newStory: action.payload,
        error: null,
      };

    case GET_USER_STORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        userStories: action.payload,
        error: null,
      };

    case GET_ALL_STORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        stories: action.payload,
        error: null,
      };

    case CREATE_STORY_FAILURE:
    case GET_USER_STORIES_FAILURE:
    case GET_ALL_STORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};