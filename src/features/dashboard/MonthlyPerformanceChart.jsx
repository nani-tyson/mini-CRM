import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyPerformanceChart = ({ data: monthlyData }) => {
  const chartData = useMemo(() => {
    // This check is important. If monthlyData is not an array, return a default structure.
    if (!Array.isArray(monthlyData) || monthlyData.length === 0) {
      return null; // Return null if there's no data to process
    }

    const getMonthName = (monthNumber) => {
      /* ... same as before ... */
    };

    const labels = monthlyData.map((d) => `${getMonthName(d.month)} ${d.year}`);
    const totalLeads = monthlyData.map((d) => d.totalLeads);
    const convertedValue = monthlyData.map((d) => d.convertedValue);

    return {
      labels,
      datasets: [
        {
          label: "Total Leads",
          data: totalLeads,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          yAxisID: "y",
        },
        {
          label: "Converted Value ($)",
          data: convertedValue,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          yAxisID: "y1",
        },
      ],
    };
  }, [monthlyData]);

  const options = {
    /* ... same as before ... */
  };

  // If there's no data, show the message
  if (!chartData) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow-lg text-center h-full flex items-center justify-center">
        <p className="text-slate-400">
          Not enough monthly data to display chart.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow-lg">
      {/* The final safety check: only render if chartData is valid */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MonthlyPerformanceChart;
