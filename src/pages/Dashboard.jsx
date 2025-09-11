import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

const Dashboard = () => {
    const user = useSelector(selectCurrentUser);

    return (
        // Wrap content in a card
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-4 text-lg text-gray-600">
                This is the main dashboard. Welcome, {user?.name || 'User'}!
            </p>
            {/* You can add stats or charts here in the future */}
        </div>
    );
};

export default Dashboard;