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

const initialState = {
  chats: [],
  selectedChat: null,
  loading: false,
  error: null,
  onlineUsers: [],
  typingUsers: {},
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHAT_REQUEST:
    case GET_USER_CHATS_REQUEST:
    case GET_CHAT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: [action.payload, ...state.chats],
        error: null,
      };

    case GET_USER_CHATS_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.payload,
        error: null,
      };

    case GET_CHAT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedChat: action.payload,
        error: null,
      };

    case UPDATE_CHAT_SUCCESS:
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === action.payload.id ? action.payload : chat
        ),
        selectedChat:
          state.selectedChat?.id === action.payload.id
            ? action.payload
            : state.selectedChat,
      };

    case CREATE_CHAT_FAILURE:
    case GET_USER_CHATS_FAILURE:
    case GET_CHAT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};