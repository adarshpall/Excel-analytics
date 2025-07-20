import React, { useState } from 'react';
import axios from 'axios';
import ChartComponent from '../components/ChartComponent';
import ThreeDBarChart from '../components/3DBarChart';
import toast from 'react-hot-toast';

function Uploads({
  data,
  setData,
  columns,
  setColumns,
  xKey,
  setXKey,
  yKey,
  setYKey,
  chartType,
  setChartType
}) {
  const [fileName, setFileName] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return alert("Please select a file");

    setFileName(file.name);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('https://excel-analytics-2.onrender.com/api/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const cols = res.data.columns;
      setData(res.data.data);
      setColumns(cols);

      // ✅ Auto-select X & Y axis after upload
      if (cols.length >= 2) {
        setXKey(cols[0]);
        setYKey(cols[1]);
      } else if (cols.length === 1) {
        setXKey(cols[0]);
        setYKey(cols[0]);
      }

     toast.success("✅ File uploaded! Chart is ready.");
    } catch (err) {
toast.error(err.response?.data?.error || '❌ Upload failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-white mb-8 text-center">
        📈 Excel Chart Generator
      </h2>

      {/* Stylish Upload Box */}
      <div className="bg-gray-800 p-6 rounded-xl max-w-2xl mx-auto shadow-md border-2 border-dashed border-gray-700 hover:border-indigo-500 transition-all duration-200">
        <label className="flex flex-col items-center justify-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-indigo-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3M12 3v9" />
          </svg>
          <p className="text-gray-300 font-medium text-sm mb-1">
            Click to upload Excel file
          </p>
          <p className="text-gray-500 text-xs mb-2">(.xlsx or .xls only)</p>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
        {fileName && (
          <p className="text-green-400 text-sm text-center mt-3">
            ✅ Uploaded: {fileName}
          </p>
        )}
      </div>

      {/* Dropdowns */}
      {data.length > 0 && (
        <>
          <div className="flex flex-wrap justify-center gap-4 mt-8 bg-gray-800 p-4 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-700">
            <div>
              <label className="text-white text-sm block mb-1">X-Axis</label>
              <select value={xKey} onChange={(e) => setXKey(e.target.value)} className="bg-gray-700 text-white p-2 rounded w-40">
                {columns.map(col => <option key={col}>{col}</option>)}
              </select>
            </div>

            <div>
              <label className="text-white text-sm block mb-1">Y-Axis</label>
              <select value={yKey} onChange={(e) => setYKey(e.target.value)} className="bg-gray-700 text-white p-2 rounded w-40">
                {columns.map(col => <option key={col}>{col}</option>)}
              </select>
            </div>

            <div>
              <label className="text-white text-sm block mb-1">Chart Type</label>
              <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="bg-gray-700 text-white p-2 rounded w-48">
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="pie">Pie</option>
                <option value="scatter">Scatter</option>
                <option value="3d">3D Bar (Three.js)</option>
              </select>
            </div>
          </div>

          {/* Chart Area */}
          <div className="mt-8 max-w-5xl mx-auto">
            {chartType === '3d' ? (
              <ThreeDBarChart data={data} xKey={xKey} yKey={yKey} />
            ) : (
              <ChartComponent data={data} xKey={xKey} yKey={yKey} chartType={chartType} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Uploads;
