import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";

const rootReducer = combineReducers({
  auth: authReducer, // Make sure this is a function, not undefined
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;