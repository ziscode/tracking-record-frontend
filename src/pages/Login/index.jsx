import React from 'react';
import { useAuth } from '../../contexts/auth';

const Login = () => {
  const { signed, Login } = useAuth();

  async function handleLogin() {      
    await Login({
      email: 'test@gmail.com',
      password: '123456',
    });
  }

  return (
    <span>
        <h1>Login Page!</h1>
        <button onClick={handleLogin}>Login</button>                
    </span>
    
  );
};

export default Login;
