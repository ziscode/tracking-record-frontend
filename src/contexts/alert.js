import React, { createContext, useState, useEffect, useContext } from 'react';
import Toasts from '../components/Toasts';
import checkIcon from '../assets/check.svg';
import errorIcon from '../assets/error.svg';
import infoIcon from '../assets/info.svg';
import warningIcon from '../assets/warning.svg';

const AlertContextData = {
  alert: (message) => { },
  success: (message) => { },
  warning: (message) => { },
  danger: (message) => { },
  info: (message) => { },
}

const AlertContext = createContext(AlertContextData);

export const AlertProvider = ({ children }) => {

  const [toasts, setToasts] = useState([]);

  function alert(message) {
    setToasts([...toasts, createContent(message, '')]);
  }

  function success(message) {
    setToasts([...toasts, createContent(message, 'success')]);
  }

  function warning(message) {
    setToasts([...toasts, createContent(message, 'warning')]);
  }

  function danger(message) {
    setToasts([...toasts, createContent(message, 'danger')]);
  }

  function info(message) {
    setToasts([...toasts, createContent(message, 'info')]);
  }

  const createContent = (message, type = '' ) => {
    let id = Math.floor((Math.random() * 101) + 1);
    let toastProperties = {id, title:'Title', description: message, variant:type, color:'#6c757d', backgroundColor:'#ffffff'};

    switch(type) {
      case 'success':
        toastProperties = { ...toastProperties, ...{
          title: 'Success',
          backgroundColor: '#198754',
          color: '#ffffff',
          icon: checkIcon
        }}
        break;
      case 'danger':
        toastProperties = { ...toastProperties, ...{
          title: 'Danger',
          backgroundColor: '#dc3545',
          color: '#ffffff',
          icon: errorIcon
        }}
        break;
      case 'info':
        toastProperties = { ...toastProperties, ...{
          title: 'Info',
          backgroundColor: '#0dcaf0',
          color: '#ffffff',
          icon: infoIcon
        }}
        break;
      case 'warning':
        toastProperties = { ...toastProperties, ...{
          title: 'Warning',
          backgroundColor: '#ffc107',
          color: '#ffffff',
          icon: warningIcon
        }}
        break;      
      }
      
      return toastProperties;
  }

  return (
    <AlertContext.Provider value={{ alert, success, warning, danger, info }}>
      <Toasts toastList={toasts}/>

      {children}
    </AlertContext.Provider>
  );
};

export function Alert() {
  const context = useContext(AlertContext);
  return context;
}
