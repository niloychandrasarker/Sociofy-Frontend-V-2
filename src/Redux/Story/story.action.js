import { api } from "../../Config/api";
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

// Create Story
export const createStoryAction = (storyData) => async (dispatch) => {
  dispatch({ type: CREATE_STORY_REQUEST });
  try {
    const { data } = await api.post("/api/story", storyData);
    dispatch({ type: CREATE_STORY_SUCCESS, payload: data });
    console.log("Create story success:", data);
    return data;
  } catch (error) {
    console.error("Create story error:", error);
    dispatch({
      type: CREATE_STORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Get User Stories
export const getUserStoriesAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_STORIES_REQUEST });
  try {
    const { data } = await api.get(`/api/story/user/${userId}`);
    dispatch({ type: GET_USER_STORIES_SUCCESS, payload: data });
    console.log("Get user stories success:", data);
    return data;
  } catch (error) {
    console.error("Get user stories error:", error);
    dispatch({
      type: GET_USER_STORIES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Get All Stories
export const getAllStoriesAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_STORIES_REQUEST });
  try {
    const { data } = await api.get("/api/story");
    dispatch({ type: GET_ALL_STORIES_SUCCESS, payload: data });
    console.log("Get all stories success:", data);
    return data;
  } catch (error) {
    console.error("Get all stories error:", error);
    dispatch({
      type: GET_ALL_STORIES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};