import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/auth/authSlice';
import toast from 'react-hot-toast';
import { HomeIcon, UsersIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const activeLink = 'bg-sky-600 text-white';
    const normalLink = 'text-slate-300 hover:bg-slate-700 hover:text-white';

    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-75 z-20 transition-opacity lg:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
            
            <div className={`fixed lg:relative flex flex-col w-64 bg-slate-800 text-white transition-all duration-300 ease-in-out z-30 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="flex items-center justify-center h-16 border-b border-slate-700">
                    <h1 className="text-xl font-bold text-sky-400">MiniCRM</h1>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-2">
                    <NavLink to="/" className={({ isActive }) => `${isActive ? activeLink : normalLink} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
                        <HomeIcon className="mr-3 h-6 w-6" />
                        Dashboard
                    </NavLink>
                    <NavLink to="/customers" className={({ isActive }) => `${isActive ? activeLink : normalLink} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
                        <UsersIcon className="mr-3 h-6 w-6" />
                        Customers
                    </NavLink>
                </nav>
                <div className="px-2 py-4 border-t border-slate-700">
                    <button onClick={handleLogout} className={`${normalLink} group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md`}>
                        <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6" />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;