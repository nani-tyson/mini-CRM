import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

// The component now accepts a 'data' prop
const LeadStatusChart = ({ data: leadStatusData }) => {

    const chartData = useMemo(() => {
        if (!leadStatusData) return { labels: [], datasets: [] };
        
        const labels = Object.keys(leadStatusData);
        const data = Object.values(leadStatusData);

        return {
            labels,
            datasets: [
                {
                    label: '# of Leads',
                    data,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)', // Blue for New
                        'rgba(255, 206, 86, 0.6)', // Yellow for Contacted
                        'rgba(75, 192, 192, 0.6)', // Green for Converted
                        'rgba(255, 99, 132, 0.6)', // Red for Lost
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    }, [leadStatusData]);

    const options = { /* ... same as before ... */ };

    // No need for loading/error states here, the parent will handle it
    if (!leadStatusData || Object.keys(leadStatusData).length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">No lead data available to display chart.</p>
            </div>
        );
    }
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default LeadStatusChart;
