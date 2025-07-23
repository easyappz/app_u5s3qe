import { instance } from './axios';

export const getPosts = async () => {
  return await instance.get('/api/posts');
};

export const createPost = async (data) => {
  return await instance.post('/api/posts', data);
};

export const likePost = async (postId) => {
  return await instance.post(`/api/posts/${postId}/like`);
};

export const commentPost = async (postId, data) => {
  return await instance.post(`/api/posts/${postId}/comment`, data);
};
