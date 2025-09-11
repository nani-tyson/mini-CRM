import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = useSelector(selectCurrentUser);

    return (
        <div className="flex h-screen bg-slate-900 font-sans">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden flex items-center justify-between bg-slate-800 p-4 border-b border-slate-700">
                    <button onClick={() => setSidebarOpen(true)} className="text-slate-400 focus:outline-none">
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                    <div className="text-lg font-bold text-slate-200">Welcome, {user?.name || 'User'}</div>
                </header>
                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;