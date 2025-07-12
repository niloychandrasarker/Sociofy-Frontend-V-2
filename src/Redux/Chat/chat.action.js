import { api } from "../../Config/api";
import {
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAILURE,
  GET_USER_CHATS_REQUEST,
  GET_USER_CHATS_SUCCESS,
  GET_USER_CHATS_FAILURE,
  GET_CHAT_BY_ID_REQUEST,
  GET_CHAT_BY_ID_SUCCESS,
  GET_CHAT_BY_ID_FAILURE,
  UPDATE_CHAT_SUCCESS,
} from "./chat.actionType";

// Create Chat
export const createChatAction = (chatData) => async (dispatch) => {
  dispatch({ type: CREATE_CHAT_REQUEST });
  try {
    const { data } = await api.post("/api/chats", chatData);
    dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
    console.log("Create chat success:", data);
    return data;
  } catch (error) {
    console.error("Create chat error:", error);
    dispatch({
      type: CREATE_CHAT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Get User Chats
export const getUserChatsAction = () => async (dispatch) => {
  dispatch({ type: GET_USER_CHATS_REQUEST });
  try {
    const { data } = await api.get("/api/chats");
    dispatch({ type: GET_USER_CHATS_SUCCESS, payload: data });
    console.log("Get user chats success:", data);
    return data;
  } catch (error) {
    console.error("Get user chats error:", error);
    dispatch({
      type: GET_USER_CHATS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Get Chat By ID
export const getChatByIdAction = (chatId) => async (dispatch) => {
  dispatch({ type: GET_CHAT_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/chats/${chatId}`);
    dispatch({ type: GET_CHAT_BY_ID_SUCCESS, payload: data });
    console.log("Get chat by ID success:", data);
    return data;
  } catch (error) {
    console.error("Get chat by ID error:", error);
    dispatch({
      type: GET_CHAT_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Update Chat (for real-time updates)
export const updateChatAction = (chatData) => (dispatch) => {
  dispatch({ type: UPDATE_CHAT_SUCCESS, payload: chatData });
};