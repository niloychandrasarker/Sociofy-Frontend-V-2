import { api } from "../../Config/api";
import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE,
  GET_COMMENT_BY_ID_REQUEST,
  GET_COMMENT_BY_ID_SUCCESS,
  GET_COMMENT_BY_ID_FAILURE,
  GET_POST_COMMENTS_REQUEST,
  GET_POST_COMMENTS_SUCCESS,
  GET_POST_COMMENTS_FAILURE,
} from "./comment.actionType";

// Create Comment
export const createCommentAction = (postId, commentData) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });
  try {
    const { data } = await api.post(`/api/comments/post/${postId}`, commentData);
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
    console.log("Create comment success:", data);
    return data;
  } catch (error) {
    console.error("Create comment error:", error);
    dispatch({
      type: CREATE_COMMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Like Comment
export const likeCommentAction = (commentId) => async (dispatch) => {
  dispatch({ type: LIKE_COMMENT_REQUEST });
  try {
    const { data } = await api.put(`/api/comments/like/${commentId}`);
    dispatch({ type: LIKE_COMMENT_SUCCESS, payload: data });
    console.log("Like comment success:", data);
    return data;
  } catch (error) {
    console.error("Like comment error:", error);
    dispatch({
      type: LIKE_COMMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Get Comment By ID
export const getCommentByIdAction = (commentId) => async (dispatch) => {
  dispatch({ type: GET_COMMENT_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/comments/${commentId}`);
    dispatch({ type: GET_COMMENT_BY_ID_SUCCESS, payload: data });
    console.log("Get comment by ID success:", data);
    return data;
  } catch (error) {
    console.error("Get comment by ID error:", error);
    dispatch({
      type: GET_COMMENT_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Get Post Comments
export const getPostCommentsAction = (postId) => async (dispatch) => {
  dispatch({ type: GET_POST_COMMENTS_REQUEST });
  try {
    const { data } = await api.get(`/api/comments/post/${postId}`);
    dispatch({ type: GET_POST_COMMENTS_SUCCESS, payload: data });
    console.log("Get post comments success:", data);
    return data;
  } catch (error) {
    console.error("Get post comments error:", error);
    dispatch({
      type: GET_POST_COMMENTS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};