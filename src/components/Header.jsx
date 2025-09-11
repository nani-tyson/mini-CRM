import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logOut());
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const activeLink = 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium';
    const normalLink = 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-white font-bold">MiniCRM</h1>
                        </div>
                        {/* Desktop Menu Links - Hidden on mobile */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : normalLink)}>Dashboard</NavLink>
                                <NavLink to="/customers" className={({ isActive }) => (isActive ? activeLink : normalLink)}>Customers</NavLink>
                            </div>
                        </div>
                    </div>
                    {/* Desktop User Info & Logout - Hidden on mobile */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                             <span className="text-gray-400 mr-4">Welcome, {user?.name || 'User'}</span>
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
                        </div>
                    </div>
                    {/* Hamburger Menu Button - Visible on mobile */}
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Shows when isMenuOpen is true */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : normalLink) + ' block'}>Dashboard</NavLink>
                    <NavLink to="/customers" className={({ isActive }) => (isActive ? activeLink : normalLink) + ' block'}>Customers</NavLink>
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                             <span className="text-gray-400">Welcome, {user?.name || 'User'}</span>
                        </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                        <button onClick={handleLogout} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;