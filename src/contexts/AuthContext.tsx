import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (password: string) => {
    if (password === "123") {
      setIsAuthenticated(true);
      navigate('/pitch');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};