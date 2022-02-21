import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const PrivateRoute = ({Component}) => {
    const { signed } = useAuth();

    if (signed == false)
        return <Navigate to="/login" />
    
    return  (<Component></Component>) 
}

export default PrivateRoute;