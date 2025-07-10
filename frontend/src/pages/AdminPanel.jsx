import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [uploads, setUploads] = useState([]);


 // ✅ make sure installed and imported

const fetchData = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const [userRes, uploadRes] = await Promise.all([
      axios.get('http://localhost:5000/api/admin/users', config),
      axios.get('http://localhost:5000/api/admin/uploads', config),
    ]);

    setUsers(userRes.data);
    setUploads(uploadRes.data);
  } catch (err) {
    const errorMsg =
      err?.response?.data?.error ||
      err?.response?.statusText ||
      'Something went wrong while fetching admin data';

    toast.error(`🚫 ${errorMsg}`);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  const makeAdmin = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/admin/make-admin/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
     toast.success("🎉 User promoted to admin!");
      fetchData(); // Refresh list
    } catch (err) {
      alert('Failed to promote user');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">All Users</h3>
        <ul className="bg-gray-800 p-4 rounded shadow space-y-2">
          {users.map(user => (
            <li key={user._id} className="flex justify-between items-center bg-gray-700 p-3 rounded">
              <div>
                <span className="font-bold text-white">{user.email}</span> — <span className="text-yellow-400">{user.role}</span>
              </div>
              {user.role !== 'admin' && (
                <button
                  onClick={() => makeAdmin(user._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Make Admin
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">All Uploads</h3>
        <ul className="bg-gray-800 p-4 rounded shadow space-y-2">
          {uploads.map(upload => (
            <li key={upload._id} className="bg-gray-700 p-3 rounded">
              <span className="font-semibold">{upload.filename}</span> —{' '}
              {upload.userId?.email || 'Unknown'} —{' '}
              {new Date(upload.uploadedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;
