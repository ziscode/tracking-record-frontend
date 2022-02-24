import React, {Fragment} from 'react';
import { AuthProvider } from './contexts/auth';
import { AlertProvider } from './contexts/alert';
import AppRoutes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from 'react-bootstrap';
import axios from 'axios';
import { Contants } from './helpers/constants';

axios.defaults.baseURL = Contants.API_URL;
axios.defaults.withCredentials = true;

function App() {
  
  return (
    
    <AuthProvider>
      <AlertProvider>
      <Container>
        
        <AppRoutes/>
      </Container>
      </AlertProvider>
    </AuthProvider>
    
  );
}

export default App;
