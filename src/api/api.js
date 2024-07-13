import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sua-api.com', // Substitua pela URL da sua API
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Network Error');
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Network Error');
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await api.post('/reset-password', { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Network Error');
  }
};

// Nova função para atualizar o perfil do usuário
export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/update-profile', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Network Error');
  }
};
