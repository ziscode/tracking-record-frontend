import React from 'react';
import { useAuth } from '../../contexts/auth';

const User = () => {
  const { signed, Login } = useAuth();

  async function handleLogin() {      
    await Login({
      email: 'test@gmail.com',
      password: '123456',
    });
  }

  return (
    <span>
        <h1>User Page!</h1>
                        
    </span>
    
  );
};

export default User;
