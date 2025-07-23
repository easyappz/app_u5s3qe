import { instance } from './axios';

export const getProfile = async () => {
  return await instance.get('/api/profile');
};

export const updateProfile = async (data) => {
  return await instance.put('/api/profile', data);
};
