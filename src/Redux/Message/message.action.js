import { api } from "../../Config/api";
import WebSocketService from "../../Config/websocket";
import {
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  GET_CHAT_MESSAGES_REQUEST,
  GET_CHAT_MESSAGES_SUCCESS,
  GET_CHAT_MESSAGES_FAILURE,
  RECEIVE_MESSAGE,
  MESSAGE_DELIVERED,
  MESSAGE_READ,
  SET_TYPING_USERS,
  SET_ONLINE_USERS,
} from "./message.actionType";

// Create Message
export const createMessageAction = (messageData) => async (dispatch) => {
  dispatch({ type: CREATE_MESSAGE_REQUEST });
  try {
    const { data } = await api.post("/api/messages", messageData);
    dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data });
    
    // Send message via WebSocket for real-time delivery
    WebSocketService.sendMessage(data);
    
    console.log("Create message success:", data);
    return data;
  } catch (error) {
    console.error("Create message error:", error);
    dispatch({
      type: CREATE_MESSAGE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Get Chat Messages
export const getChatMessagesAction = (chatId) => async (dispatch) => {
  dispatch({ type: GET_CHAT_MESSAGES_REQUEST });
  try {
    const { data } = await api.get(`/api/messages/chat/${chatId}`);
    dispatch({ type: GET_CHAT_MESSAGES_SUCCESS, payload: { chatId, messages: data } });
    console.log("Get chat messages success:", data);
    return data;
  } catch (error) {
    console.error("Get chat messages error:", error);
    dispatch({
      type: GET_CHAT_MESSAGES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Real-time message actions
export const receiveMessageAction = (message) => (dispatch) => {
  dispatch({ type: RECEIVE_MESSAGE, payload: message });
};

export const messageDeliveredAction = (messageId) => (dispatch) => {
  dispatch({ type: MESSAGE_DELIVERED, payload: messageId });
};

export const messageReadAction = (messageId) => (dispatch) => {
  dispatch({ type: MESSAGE_READ, payload: messageId });
  WebSocketService.markMessageAsRead(messageId);
};

export const setTypingUsersAction = (typingData) => (dispatch) => {
  dispatch({ type: SET_TYPING_USERS, payload: typingData });
};

export const setOnlineUsersAction = (onlineUsers) => (dispatch) => {
  dispatch({ type: SET_ONLINE_USERS, payload: onlineUsers });
};

// WebSocket event handlers
export const initializeWebSocketListeners = () => (dispatch) => {
  WebSocketService.onNewMessage((message) => {
    dispatch(receiveMessageAction(message));
  });

  WebSocketService.onMessageDelivered((messageId) => {
    dispatch(messageDeliveredAction(messageId));
  });

  WebSocketService.onMessageRead((messageId) => {
    dispatch(messageReadAction(messageId));
  });

  WebSocketService.onUserOnline((userData) => {
    dispatch(setOnlineUsersAction(userData));
  });

  WebSocketService.onUserOffline((userData) => {
    dispatch(setOnlineUsersAction(userData));
  });

  WebSocketService.onTyping((typingData) => {
    dispatch(setTypingUsersAction(typingData));
  });

  WebSocketService.onStopTyping((typingData) => {
    dispatch(setTypingUsersAction(typingData));
  });
};