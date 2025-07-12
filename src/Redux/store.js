import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";
import { userReducer } from "./User/user.reducer";
import { commentReducer } from "./Comment/comment.reducer";
import { reelsReducer } from "./Reels/reels.reducer";
import { storyReducer } from "./Story/story.reducer";
import { chatReducer } from "./Chat/chat.reducer";
import { messageReducer } from "./Message/message.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  user: userReducer,
  comment: commentReducer,
  reels: reelsReducer,
  story: storyReducer,
  chat: chatReducer,
  message: messageReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;