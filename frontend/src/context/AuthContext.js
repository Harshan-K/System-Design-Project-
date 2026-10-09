import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await apiService.getCurrentUser();
        setUser(response.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', response.user.role);
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await apiService.login(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', response.user.role);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', response.user.role);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};