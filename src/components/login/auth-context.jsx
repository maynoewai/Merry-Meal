import React, { createContext, useState, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext(null);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Login function with dummy authentication
  const login = (email, password) => {
    // Dummy authentication (replace with actual authentication logic)
    if (email === 'test@example.com' && password === 'password123') {
      setIsAuthenticated(true);
      setUser({ 
        email, 
        name: 'John Doe',
        role: 'admin'
      });
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};