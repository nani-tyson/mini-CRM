import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentToken } from '../features/auth/authSlice';

const Public = () => {
    const token = useSelector(selectCurrentToken);
    
    // If user is logged in, redirect them from public pages (like login) to the dashboard
    return token ? <Navigate to="/" /> : <Outlet />;
};
export default Public;
