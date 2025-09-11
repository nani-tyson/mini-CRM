import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            {/* Added padding that adapts to screen size */}
            <main className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;