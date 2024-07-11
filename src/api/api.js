import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sua-api.com', // Substitua pela URL da sua API
});

export const registerUser = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/login', userData);
  return response.data;
};

export const resetPassword = async (email) => {
  const response = await api.post('/reset-password', { email });
  return response.data;
};
