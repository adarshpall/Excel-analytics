import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode'; // ✅ Sahi tarika


import Dashboard from './pages/Dashboard';
import Uploads from './pages/Uploads';
import ProfilePage from './pages/ProfilePage';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Login from './pages/loginpage';
import Signup from './pages/signuppage';
import UploadHistory from './pages/UploadHistory';
import AdminPanel from './pages/AdminPanel';
import UserDashboard from './pages/UserDashboard';
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/auth/login' || location.pathname === '/auth/signup';

  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [data, setData] = useState([]);
  const [xKey, setXKey] = useState('');
  const [yKey, setYKey] = useState('');
  const [columns, setColumns] = useState([]);
  const [chartType, setChartType] = useState('bar');

  const decoded = token ? jwtDecode(token) : null;
  const isAdmin = decoded?.role === 'admin';

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    toast.success("You’ve been logged out");
    navigate('/auth/login');
  };

  // 🔐 Auto logout when token expires
  useEffect(() => {
    if (!decoded?.exp) return;

    const now = Date.now() / 1000;
    const timeLeft = decoded.exp - now;

    if (timeLeft <= 0) {
      handleLogout();
    } else {
      const timeout = setTimeout(() => {
        handleLogout();
      }, timeLeft * 1000); // Convert to ms

      return () => clearTimeout(timeout);
    }
  }, [token]);

   // Optional private route wrapper
  const PrivateRoute = ({ element }) => {
    return token ? element : <Navigate to="/auth/signup" />;
  };
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br via-gray-800 from-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>

      {!isAuthPage && <Sidebar onLogout={handleLogout} />}
      <div className="flex-1 flex flex-col relative z-10">
        {!isAuthPage && <Topbar onLogout={handleLogout} />}
        <div className="flex-1 overflow-auto px-4 py-2">
          <Routes>
<Route
  path="/"
  element={
    <PrivateRoute
      element={
        decoded?.role === 'admin' ? <Dashboard /> : <UserDashboard />
      }
    />
  }
/>

            <Route
              path='/uploads'
              element={
                <PrivateRoute
                  element={
                    <Uploads
                      data={data}
                      setData={setData}
                      columns={columns}
                      setColumns={setColumns}
                      xKey={xKey}
                      yKey={yKey}
                      setXKey={setXKey}
                      setYKey={setYKey}
                      chartType={chartType}
                      setChartType={setChartType}
                    />
                  }
                />
              }
            />
            <Route path='/profile' element={<PrivateRoute element={<ProfilePage />} />} />
            <Route path='/history' element={<PrivateRoute element={<UploadHistory />} />} />
            <Route path='/admin' element={<PrivateRoute element={<AdminPanel />} requireAdmin />} />
            <Route path='/auth/login' element={<Login onLogin={handleLogin} />} />
            <Route path='/auth/signup' element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
