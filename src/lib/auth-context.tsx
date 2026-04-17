import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'super_admin' | 'reviewer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    // const savedUser = localStorage.getItem('lotiq_user');
    // if (savedUser) {
    //   setUser(JSON.parse(savedUser));
    // }
    setIsLoading(false);
  }, []);

  const login = (role: UserRole) => {
    const mockUser: User = {
      id: role === 'super_admin' ? '1' : '2',
      name: role === 'super_admin' ? 'Super Admin' : 'Reviewer User',
      email: role === 'super_admin' ? 'admin@lotiq.com' : 'reviewer@lotiq.com',
      role,
    };
    setUser(mockUser);
    localStorage.setItem('lotiq_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lotiq_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
