import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useMemo } from 'react';

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const LeadStatusChart = ({ data: leadStatusData }) => {

    const chartData = useMemo(() => {
        if (!leadStatusData || Object.keys(leadStatusData).length === 0) {
            return { labels: [], datasets: [] };
        }

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
                        '#36a2eb',
                        '#ffce56',
                        '#4bc0c0',
                        '#ff6384',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    }, [leadStatusData]);

    const options = {
        responsive: true,
        // --- ADD THIS LINE ---
        maintainAspectRatio: false, // Important for fitting chart in a container
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#cbd5e1' }
            },
            title: {
                display: true,
                text: 'Lead Status Distribution',
                color: '#e2e8f0',
                font: { size: 18 }
            },
        },
    };

    if (!leadStatusData || Object.keys(leadStatusData).length === 0) {
        return (
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow-lg text-center h-full flex items-center justify-center min-h-[400px]">
                <p className="text-slate-400">Add a lead to see chart data.</p>
            </div>
        );
    }
    
    return (
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow-lg">
            {/* --- WRAP THE CHART IN A SIZED, RELATIVE CONTAINER --- */}
            <div className="relative h-80 w-full">
                <Doughnut data={chartData} options={options} />
            </div>
        </div>
    );
};

export default LeadStatusChart;