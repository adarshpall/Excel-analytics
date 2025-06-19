import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, Users, Clock } from 'lucide-react';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUploads, setTotalUploads] = useState(0);
  const [lastUpload, setLastUpload] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      try {
        const resUsers = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const resUploads = await axios.get('http://localhost:5000/api/admin/uploads', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTotalUsers(resUsers.data.length);
        setTotalUploads(resUploads.data.length);
        if (resUploads.data.length > 0) {
          const latest = resUploads.data.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];
          setLastUpload(new Date(latest.uploadedAt).toLocaleString());
        }
      } catch (err) {
        console.error("Dashboard stats fetch failed", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">📊 Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Total Uploads */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 flex items-center gap-4 hover:shadow-lg transition">
          <FileText size={40} className="text-indigo-400" />
          <div>
            <p className="text-xl font-bold">{totalUploads}</p>
            <p className="text-gray-400 text-sm">Total Uploads</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 flex items-center gap-4 hover:shadow-lg transition">
          <Users size={40} className="text-pink-400" />
          <div>
            <p className="text-xl font-bold">{totalUsers}</p>
            <p className="text-gray-400 text-sm">Total Users</p>
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

      {/* Placeholder for future AI Summary or charts */}
      <div className="mt-10 max-w-6xl mx-auto text-center text-gray-500 italic">
        🚀 AI Summary & recent trends coming soon...
      </div>
    </div>
  );
};

export default Dashboard;
