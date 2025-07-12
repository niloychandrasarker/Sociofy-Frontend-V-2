import { api } from "../../Config/api";
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

// Search Users
export const searchUsersAction = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USERS_REQUEST });
  try {
    const { data } = await api.get(`/api/users/search?query=${query}`);
    dispatch({ type: SEARCH_USERS_SUCCESS, payload: data });
    console.log("Search users success:", data);
    return data;
  } catch (error) {
    console.error("Search users error:", error);
    dispatch({
      type: SEARCH_USERS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Get User By ID
export const getUserByIdAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/users/${userId}`);
    dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: data });
    console.log("Get user by ID success:", data);
    return data;
  } catch (error) {
    console.error("Get user by ID error:", error);
    dispatch({
      type: GET_USER_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Follow/Unfollow User
export const followUserAction = (userId) => async (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUEST });
  try {
    const { data } = await api.put(`/api/users/${userId}/follow`);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
    console.log("Follow user success:", data);
    return data;
  } catch (error) {
    console.error("Follow user error:", error);
    dispatch({
      type: FOLLOW_USER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Get Popular Users
export const getPopularUsersAction = () => async (dispatch) => {
  dispatch({ type: GET_POPULAR_USERS_REQUEST });
  try {
    const { data } = await api.get("/api/users/popular");
    dispatch({ type: GET_POPULAR_USERS_SUCCESS, payload: data });
    console.log("Get popular users success:", data);
    return data;
  } catch (error) {
    console.error("Get popular users error:", error);
    dispatch({
      type: GET_POPULAR_USERS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Get All Users
export const getAllUsersAction = () => async (dispatch) => {
  dispatch({ type: GET_POPULAR_USERS_REQUEST });
  try {
    const { data } = await api.get("/users");
    dispatch({ type: GET_POPULAR_USERS_SUCCESS, payload: data });
    console.log("Get all users success:", data);
    return data;
  } catch (error) {
    console.error("Get all users error:", error);
    dispatch({
      type: GET_POPULAR_USERS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};