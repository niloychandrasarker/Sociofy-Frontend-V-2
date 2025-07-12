import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";
import { userReducer } from "./User/user.reducer";

const rootReducer = combineReducers({
  auth: authReducer, // Make sure this is a function, not undefined
  post: postReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;