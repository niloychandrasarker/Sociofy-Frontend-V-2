import { api } from "../../Config/api";
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_USER_POSTS_REQUEST,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
} from "./post.actionType";

// Create Post
export const createPostAction = (postData) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });
  try {
    const { data } = await api.post("/api/posts", postData);
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    console.log("Create post success:", data);
  } catch (error) {
    console.error("Create post error:", error);
    dispatch({
      type: CREATE_POST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get All Posts
export const getAllPostsAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POSTS_REQUEST });
  try {
    const { data } = await api.get("/api/posts");
    dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: data });
    console.log("Get all posts success:", data);
  } catch (error) {
    console.error("Get all posts error:", error);
    dispatch({
      type: GET_ALL_POSTS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get User Posts
export const getUserPostsAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_POSTS_REQUEST });
  try {
    const { data } = await api.get(`/api/posts/user/${userId}`);
    dispatch({ type: GET_USER_POSTS_SUCCESS, payload: data });
    console.log("Get user posts success:", data);
  } catch (error) {
    console.error("Get user posts error:", error);
    dispatch({
      type: GET_USER_POSTS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Like Post
export const likePostAction = (postId) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST });
  try {
    const { data } = await api.put(`/api/posts/${postId}/like`);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
    console.log("Like post success:", data);
  } catch (error) {
    console.error("Like post error:", error);
    dispatch({
      type: LIKE_POST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create Comment
export const createCommentAction = (postId, commentData) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });
  try {
    const { data } = await api.post(`/api/posts/${postId}/comments`, commentData);
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
    console.log("Create comment success:", data);
  } catch (error) {
    console.error("Create comment error:", error);
    dispatch({
      type: CREATE_COMMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete Post
export const deletePostAction = (postId) => async (dispatch) => {
  dispatch({ type: DELETE_POST_REQUEST });
  try {
    await api.delete(`/api/posts/${postId}`);
    dispatch({ type: DELETE_POST_SUCCESS, payload: postId });
    console.log("Delete post success");
  } catch (error) {
    console.error("Delete post error:", error);
    dispatch({
      type: DELETE_POST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Save Post
export const savePostAction = (postId) => async (dispatch) => {
  dispatch({ type: SAVE_POST_REQUEST });
  try {
    const { data } = await api.put(`/api/posts/${postId}/save`);
    dispatch({ type: SAVE_POST_SUCCESS, payload: data });
    console.log("Save post success:", data);
  } catch (error) {
    console.error("Save post error:", error);
    dispatch({
      type: SAVE_POST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};