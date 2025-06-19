import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function ChartComponent({ data, xKey, yKey, chartType }) {
  if (!xKey || !yKey || data.length === 0) return null;
  console.log("DATA ROW:", data[0]);
console.log("XKEY:", xKey);
console.log("YKEY:", yKey);


  const labels = data.map(row => row[xKey]);
  const values = data.map(row => row[yKey]);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${yKey} vs ${xKey}`,
        data:
          chartType === 'scatter'
            ? data.map(row => ({ x: row[xKey], y: row[yKey] }))
            : values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
  };

  const downloadChart = async () => {
    const chartElement = document.getElementById("chart-wrapper");
    const canvas = await html2canvas(chartElement);
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "chart.png";
    link.click();

    const pdf = new jsPDF();
    pdf.addImage(dataURL, "PNG", 10, 10, 190, 100);
    pdf.save("chart.pdf");
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar': return <Bar data={chartData} options={chartOptions} />;
      case 'line': return <Line data={chartData} options={chartOptions} />;
      case 'pie': return <Pie data={chartData} options={chartOptions} />;
      case 'scatter': return <Scatter data={chartData} options={chartOptions} />;
      default: return <Bar data={chartData} options={chartOptions} />;
    }
  };

  return (
    <div className="p-4">
      <div id="chart-wrapper" className="bg-white p-4 rounded shadow-md">
        {renderChart()}
      </div>
      <button
        onClick={downloadChart}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Download Chart (PNG / PDF)
      </button>
    </div>
  );
}

export default ChartComponent;
