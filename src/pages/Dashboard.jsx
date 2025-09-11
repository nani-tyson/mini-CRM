import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser, logOut } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        toast.success('Logged out successfully');
        navigate('/login');
    };
    console.log('Current User:', user);
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-4 text-xl text-black">
                Welcome, {user ? user.name : 'Guest'}!
            </p>
             <button
                onClick={handleLogout}
                className="px-4 py-2 mt-6 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
