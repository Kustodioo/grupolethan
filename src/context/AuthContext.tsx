import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definição explícita das funções de `api`
const registerUser = async (userData: any): Promise<any> => {
  // Implementação de exemplo, substitua pela lógica real
  return new Promise((resolve) => resolve(userData));
};

const loginUser = async (userData: any): Promise<any> => {
  // Implementação de exemplo, substitua pela lógica real
  return new Promise((resolve) => resolve(userData));
};

const resetPassword = async (email: string): Promise<any> => {
  // Implementação de exemplo, substitua pela lógica real
  return new Promise((resolve) => resolve(email));
};

const updateUserProfile = async (userData: any): Promise<any> => {
  // Implementação de exemplo, substitua pela lógica real
  return new Promise((resolve) => resolve(userData));
};

interface AuthContextProps {
  user: any;
  login: (user: any) => void;
  logout: () => void;
  register: (user: any) => void;
  updateProfile: (user: any) => void; // Adicionar função updateProfile ao contexto
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const login = (userData: any) => {
    setUser(userData);
    AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem('user');
  };

  const register = (userData: any) => {
    setUser(userData);
    AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const updateProfile = async (userData: any) => {
    const updatedUser = await updateUserProfile(userData);
    setUser(updatedUser);
    AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
