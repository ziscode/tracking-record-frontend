import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import LoginRoute from './LoginRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import User from '../pages/User';
import Error404 from '../pages/Errors/Error404';
import TrackingRecordIndex from '../pages/TrackingRecord';
import TrackingRecordForm from '../pages/TrackingRecord/form';

function AppRoutes() {
  const history = createBrowserHistory();
  
  return (    
      <BrowserRouter history={history}>       
         
        <Routes>
          
          <Route path='*' element={<Error404 />} />

          <Route path="/" element={<PrivateRoute Component={Home} />} />

          <Route exact path='/login' element={<LoginRoute Component={Login}/>}/>

          <Route path="/trackingrecord" element={<PrivateRoute Component={TrackingRecordIndex} />} />
          <Route path="/trackingrecord/form" element={<PrivateRoute Component={TrackingRecordForm} />} >
          <Route path="/trackingrecord/form/:id" element={<PrivateRoute Component={TrackingRecordForm} />} />
            </Route>

          <Route path="/user" element={<PrivateRoute Component={User} />} />

        </Routes>      
    </BrowserRouter>    
  );
}

export default AppRoutes;
