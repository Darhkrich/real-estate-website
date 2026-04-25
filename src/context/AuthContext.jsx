'use client';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

// Mock user for development (always logged in as admin)
const MOCK_USER = {
  id: 'admin',
  name: 'Admin User',
  email: 'admin@primeestate.com',
  role: 'admin',
};

export function AuthProvider({ children }) {
  const [user] = useState(MOCK_USER); // Always authenticated

  const login = () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, loading: false, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);