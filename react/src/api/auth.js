import { instance } from './axios';

export const register = async (data) => {
  return await instance.post('/api/auth/register', data);
};

export const login = async (data) => {
  return await instance.post('/api/auth/login', data);
};
