import React from 'react';
import { useAuth } from '../../contexts/auth';
import { Link } from "react-router-dom";

const Home = () => {
  const { signed, Logout } = useAuth();
  
  async function handleLogout() {
    Logout();
  }

  return (
    <div>
      <h1>Home</h1>
      <Link to="/users" >Users</Link><br/>
      <Link to="/profile" >Profile</Link><br/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
