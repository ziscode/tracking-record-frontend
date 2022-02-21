import React, {Fragment} from 'react';
import { AuthProvider } from './contexts/auth';
import { AlertProvider } from './contexts/alert';
import AppRoutes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from 'react-bootstrap';

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
