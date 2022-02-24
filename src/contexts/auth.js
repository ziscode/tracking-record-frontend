import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ResponseHandler } from '../helpers/responseHandler';

const AuthContextData = {
  signed: null,
  user: null,
  Login: (user) => {},
  Logout: () => {},
  CheckUser: () => {}
}

const AuthContext = createContext(AuthContextData);

export const AuthProvider = ({ children }) => {
  const storagedUser = localStorage.getItem('@App:user');
  const { errorHandler, sessionExpired } = ResponseHandler();
  const [user, setUser] = useState(storagedUser ? JSON.parse(storagedUser) : null);
  
  useEffect(() => {
    console.log(sessionExpired)
    if (sessionExpired === false) {
      Logout();
    }
  }, [])

  async function Login(userData = {}) {

    let params = {
      "username": userData._username,
      "password": userData._password,
      "remember_me": userData._remember_me
    }
    
    return axios
     .post(`${axios.defaults.baseURL}login`, params)
     .then(function (response) {
       let result = response.data;

       if (result.id) {
         if (userData._remember_me === true) {
           result['timeout'] = new Date();
           setUser(result);
           localStorage.setItem('@App:user', JSON.stringify(result));
         }
       }

       return result;
     }.bind(this))
     .catch(errorHandler.bind(this));

  }

  async function Logout() {
console.log(`${axios.defaults.baseURL}logout`)
    return axios
    .post(`${axios.defaults.baseURL}logout`)
    .then(function (response) {
      let result = response.data;

      if (result.logout === true) {
        setUser(null);
        localStorage.removeItem('@App:user');    
      }

      return result;
    }.bind(this))
    .catch(errorHandler.bind(this));

  }

  async function CheckUser() {

    return axios
    .post(`${axios.defaults.baseURL}api/checkuser`)
    .then(function (response) {
      let result = response.data;

      if (result.id) {
        setUser(result);
        localStorage.setItem('@App:user', JSON.stringify(result));        
      } else {
        setUser(null);
        localStorage.removeItem('@App:user');    
      }

      return result;
    }.bind(this))
    .catch(errorHandler.bind(this));

  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout, CheckUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}