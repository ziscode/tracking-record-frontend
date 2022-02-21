import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const LoginRoute = ({Component}) => {
    const { signed } = useAuth();

    if (signed == true)
        return <Navigate to="/" />
    
    return  (<Component></Component>) 
}

export default LoginRoute;