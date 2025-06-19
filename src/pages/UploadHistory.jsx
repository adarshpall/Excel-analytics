import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UploadHistory() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/upload/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUploads(res.data);
      } catch (err) {
        alert('Failed to fetch upload history');
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-6 bg-gray-800 rounded shadow max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Your Upload History</h2>
      <ul className="space-y-2">
        {uploads.map(upload => (
          <li key={upload._id} className="bg-gray-700 p-3 rounded">
            <div className="text-white font-semibold">{upload.filename}</div>
            <div className="text-gray-400 text-sm">{new Date(upload.uploadedAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UploadHistory;
