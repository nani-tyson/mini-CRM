import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useGetStatsQuery } from '../features/dashboard/statsApiSlice';
import LeadStatusChart from '../features/dashboard/LeadStatusChart';
import MonthlyPerformanceChart from '../features/dashboard/MonthlyPerformanceChart';

// --- HELPER COMPONENTS (This is the part that was missing) ---

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-blue-500 text-white p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.973" /></svg>;
const LeadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ValueIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>;


// --- MAIN DASHBOARD COMPONENT ---

const Dashboard = () => {
    const user = useSelector(selectCurrentUser);
    const { data: stats, isLoading, isError } = useGetStatsQuery();

    let statsContent;
    let doughnutChartContent;
    let barChartContent;

    if (isLoading) {
        statsContent = <p>Loading stats...</p>;
        doughnutChartContent = <p>Loading chart data...</p>;
        barChartContent = <p>Loading performance data...</p>;
    } else if (isError) {
        statsContent = <p className="text-red-500">Could not load dashboard stats.</p>;
        doughnutChartContent = <p className="text-red-500">Could not load chart data.</p>;
        barChartContent = <p className="text-red-500">Could not load performance data.</p>;
    } else {
        statsContent = (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    title="Total Customers" 
                    value={stats.totalCustomers} 
                    icon={<UserIcon />} 
                />
                <StatCard 
                    title="Total Leads" 
                    value={stats.totalLeads} 
                    icon={<LeadIcon />} 
                />
                <StatCard 
                    title="Converted Value" 
                    value={`$${stats.convertedLeadsValue.toLocaleString()}`} 
                    icon={<ValueIcon />}
                />
            </div>
        );
        doughnutChartContent = <LeadStatusChart data={stats.leadStatusDistribution} />;
        barChartContent = <MonthlyPerformanceChart data={stats.monthlyPerformance} />;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-2 text-lg text-gray-600">
                    Welcome back, {user?.name || 'User'}! Here's your performance summary.
                </p>
            </div>
            {statsContent}
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                <div className="lg:col-span-2">
                    {doughnutChartContent}
                </div>
                <div className="lg:col-span-3">
                    {barChartContent} 
                </div>
            </div>
        </div>
    );
};

export default Dashboard;