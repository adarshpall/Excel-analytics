// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, Clock } from 'lucide-react';

const UserDashboard = () => {
  const [totalUploads, setTotalUploads] = useState(0);
  const [lastUpload, setLastUpload] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('https://excel-analytics-2.onrender.com/api/upload/uploadss', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTotalUploads(res.data.length);
        if (res.data.length > 0) {
          const latest = res.data.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];
          console.log(latest)
          setLastUpload(new Date(latest.uploadedAt).toLocaleString());
        }
      } catch (err) {
        console.error('Failed to fetch uploads', err);
      }
    };

    fetchUploads();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">👋 Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Total Uploads */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 flex items-center gap-4 hover:shadow-lg transition">
          <FileText size={40} className="text-indigo-400" />
          <div>
            <p className="text-xl font-bold">{totalUploads}</p>
            <p className="text-gray-400 text-sm">Your Total Uploads</p>
          </div>
        </div>

        {/* Last Upload */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 flex items-center gap-4 hover:shadow-lg transition">
          <Clock size={40} className="text-yellow-400" />
          <div>
            <p className="text-lg font-bold">{lastUpload || 'No uploads yet'}</p>
            <p className="text-gray-400 text-sm">Last Upload Time</p>
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-4xl mx-auto text-center text-gray-500 italic">
        🧠 Your personal insights & summary coming soon...
      </div>
    </div>
  );
};

export default UserDashboard;
