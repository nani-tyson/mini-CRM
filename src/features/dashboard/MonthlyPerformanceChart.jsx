import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useMemo } from 'react';

// Register the necessary components for a Bar Chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyPerformanceChart = ({ data: monthlyData }) => {

    const chartData = useMemo(() => {
        if (!monthlyData) return { labels: [], datasets: [] };

        // Helper to convert month number to name
        const getMonthName = (monthNumber) => {
            const date = new Date();
            date.setMonth(monthNumber - 1);
            return date.toLocaleString('en-US', { month: 'short' });
        }

        const labels = monthlyData.map(d => `${getMonthName(d.month)} ${d.year}`);
        const totalLeads = monthlyData.map(d => d.totalLeads);
        const convertedValue = monthlyData.map(d => d.convertedValue);

        return {
            labels,
            datasets: [
                {
                    label: 'Total Leads',
                    data: totalLeads,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    yAxisID: 'y', // Assign to the left y-axis
                },
                {
                    label: 'Converted Value ($)',
                    data: convertedValue,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    yAxisID: 'y1', // Assign to the right y-axis
                },
            ],
        };
    }, [monthlyData]);

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            title: {
                display: true,
                text: 'Monthly Leads vs. Converted Value',
                font: { size: 18 },
            },
        },
        scales: {
            y: { // Left y-axis for lead count
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Number of Leads',
                }
            },
            y1: { // Right y-axis for converted value
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Value ($)',
                },
                grid: {
                    drawOnChartArea: false, // only draw grid lines for the first y-axis
                },
            },
        },
    };

    if (!monthlyData || monthlyData.length === 0) {
         return (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">Not enough monthly data to display chart.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default MonthlyPerformanceChart;
