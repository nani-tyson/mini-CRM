import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentToken } from '../features/auth/authSlice';

const Private = () => {
    const token = useSelector(selectCurrentToken);

    // If user is not logged in, redirect them from private pages to the login page
    return token ? <Outlet /> : <Navigate to="/login" />;
};
export default Private;
