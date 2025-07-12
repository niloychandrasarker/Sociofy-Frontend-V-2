import { api } from "../../Config/api";
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

// Create Reel
export const createReelAction = (reelData) => async (dispatch) => {
  dispatch({ type: CREATE_REEL_REQUEST });
  try {
    const { data } = await api.post("/api/reels", reelData);
    dispatch({ type: CREATE_REEL_SUCCESS, payload: data });
    console.log("Create reel success:", data);
    return data;
  } catch (error) {
    console.error("Create reel error:", error);
    dispatch({
      type: CREATE_REEL_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Get All Reels
export const getAllReelsAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_REELS_REQUEST });
  try {
    const { data } = await api.get("/api/reels");
    dispatch({ type: GET_ALL_REELS_SUCCESS, payload: data });
    console.log("Get all reels success:", data);
    return data;
  } catch (error) {
    console.error("Get all reels error:", error);
    dispatch({
      type: GET_ALL_REELS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Get User Reels
export const getUserReelsAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_REELS_REQUEST });
  try {
    const { data } = await api.get(`/api/reels/user/${userId}`);
    dispatch({ type: GET_USER_REELS_SUCCESS, payload: data });
    console.log("Get user reels success:", data);
    return data;
  } catch (error) {
    console.error("Get user reels error:", error);
    dispatch({
      type: GET_USER_REELS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Like Reel
export const likeReelAction = (reelId) => async (dispatch) => {
  dispatch({ type: LIKE_REEL_REQUEST });
  try {
    const { data } = await api.put(`/api/reels/like/${reelId}`);
    dispatch({ type: LIKE_REEL_SUCCESS, payload: data });
    console.log("Like reel success:", data);
    return data;
  } catch (error) {
    console.error("Like reel error:", error);
    dispatch({
      type: LIKE_REEL_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};