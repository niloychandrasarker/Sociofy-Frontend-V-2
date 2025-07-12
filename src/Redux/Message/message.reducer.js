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

const initialState = {
  messages: {},
  loading: false,
  error: null,
  onlineUsers: [],
  typingUsers: {},
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
    case GET_CHAT_MESSAGES_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_MESSAGE_SUCCESS:
      const chatId = action.payload.chatId;
      return {
        ...state,
        loading: false,
        messages: {
          ...state.messages,
          [chatId]: [...(state.messages[chatId] || []), action.payload],
        },
        error: null,
      };

    case GET_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: {
          ...state.messages,
          [action.payload.chatId]: action.payload.messages,
        },
        error: null,
      };

    case RECEIVE_MESSAGE:
      const receivedChatId = action.payload.chatId;
      return {
        ...state,
        messages: {
          ...state.messages,
          [receivedChatId]: [...(state.messages[receivedChatId] || []), action.payload],
        },
      };

    case MESSAGE_DELIVERED:
      return {
        ...state,
        messages: Object.keys(state.messages).reduce((acc, chatId) => {
          acc[chatId] = state.messages[chatId].map((message) =>
            message.id === action.payload
              ? { ...message, status: "delivered" }
              : message
          );
          return acc;
        }, {}),
      };

    case MESSAGE_READ:
      return {
        ...state,
        messages: Object.keys(state.messages).reduce((acc, chatId) => {
          acc[chatId] = state.messages[chatId].map((message) =>
            message.id === action.payload
              ? { ...message, status: "read" }
              : message
          );
          return acc;
        }, {}),
      };

    case SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload,
      };

    case SET_TYPING_USERS:
      return {
        ...state,
        typingUsers: {
          ...state.typingUsers,
          [action.payload.chatId]: action.payload.isTyping
            ? [...(state.typingUsers[action.payload.chatId] || []), action.payload.userId]
            : (state.typingUsers[action.payload.chatId] || []).filter(
                (userId) => userId !== action.payload.userId
              ),
        },
      };

    case CREATE_MESSAGE_FAILURE:
    case GET_CHAT_MESSAGES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};