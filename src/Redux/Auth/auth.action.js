import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE
} from "./auth.actionType";
import axios from "axios";
import { api, API_BASE_URL } from "../../Config/api";

// LOGIN
export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);

    // Save token to localStorage if present
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    console.log("Login action success:", data);
  } catch (error) {
    console.error("Login action error:", error);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// REGISTER
export const registerUserAction = (registerData) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);

    // Save token to localStorage if present (assuming backend sends token as 'token')
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    dispatch({ type: SIGNUP_SUCCESS, payload: data.token });
    console.log("Signup action success:", data);
  } catch (error) {
    console.error("Signup action error:", error);
    dispatch({
      type: SIGNUP_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// GET PROFILE
export const getProfileAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("UserProfile action success:", data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error("UserProfile action error:", error);
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateProfileAction = (reqData) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    const jwt = localStorage.getItem("jwt");
    await api.put(`${API_BASE_URL}/api/users`, reqData, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    const { data } = await api.get(`${API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};