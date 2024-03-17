import React, { useContext, useState, createContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface User {
  [key: string]: unknown;
}

interface AuthContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({});

  const value = { user, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};
