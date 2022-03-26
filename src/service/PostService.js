import CallAPI from './CallApiService';

const createPost = (data) => {
  return CallAPI('post', 'post', data);
};
const sharePostAsyn = (data) => {
  return CallAPI('post/share', 'post', data);
};
const updateLikePost = (post_id) => {
  return CallAPI(`/updateLike/${post_id}`, 'post');
};
const getPost = (data) => {
  return CallAPI('post');
};
const getPostById = (post_id) => {
  return CallAPI(`post/${post_id}`);
};
const updatePostAsyn = (post_id, data) => {
  return CallAPI(`post/${post_id}`, 'put', data);
};
const updateCommentAsyn = (post_id, comment_id, data) => {
  return CallAPI(`post/${post_id}/comment/${comment_id}`, 'put', data);
};
const deleteCommentAsyn = (post_id, comment_id) => {
  return CallAPI(`post/${post_id}/comment/${comment_id}`, 'delete');
};
const commentPostAsyn = (post_id, data) => {
  return CallAPI(`post/${post_id}/comment`, 'post', data);
};
const deletePostAsyn = (post_id) => {
  return CallAPI(`post/${post_id}`, 'delete');
};
export {
  createPost,
  getPost,
  updateLikePost,
  deletePostAsyn,
  updatePostAsyn,
  getPostById,
  commentPostAsyn,
  updateCommentAsyn,
  deleteCommentAsyn,
  sharePostAsyn,
};
