import React, { createContext, useState, useEffect, useContext } from 'react';

import * as api from '../services/localapi';

const AuthContextData = {
  signed: null,
  user: null,
  Login: (user) => {},
  Logout: () => {},
}

const AuthContext = createContext(AuthContextData);

export const AuthProvider = ({ children }) => {
  const storagedUser = sessionStorage.getItem('@App:user');
  const storagedToken = sessionStorage.getItem('@App:token');

  const [user, setUser] = useState(storagedToken && storagedUser ? JSON.parse(storagedUser) : null);

  useEffect(() => {
    
   

  }, []);

  async function Login(userData) {
    const response = await api.post('https://localhost:3000', userData);

    setUser(response.data.user);
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    sessionStorage.setItem('@App:user', JSON.stringify(response.data.user));
    sessionStorage.setItem('@App:token', response.data.token);
    //children.props.history.push('/');    
  }

  function Logout() {
    setUser(null);
    sessionStorage.removeItem('@App:user');
    sessionStorage.removeItem('@App:token');
    //children.props.history.push('login');
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}