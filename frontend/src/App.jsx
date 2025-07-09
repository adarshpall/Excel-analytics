import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Uploads from './pages/Uploads';
import ProfilePage from './pages/ProfilePage';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Login from './pages/loginpage';
import Signup from './pages/signuppage';
import UploadHistory from './pages/UploadHistory';
import AdminPanel from './pages/AdminPanel';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth/login' || location.pathname === '/auth/signup';

  // Global app state
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [data, setData] = useState([]);
  const [xKey, setXKey] = useState('');
  const [yKey, setYKey] = useState('');
  const [columns, setColumns] = useState([]);
  const [chartType, setChartType] = useState('bar');

  // Auth handlers
  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  // Optional private route wrapper
  const PrivateRoute = ({ element }) => {
    return token ? element : <Navigate to="/auth/login" />;
  };

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      {/* Background gradient + blur */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br via-gray-800 from-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>

      {/* Sidebar */}
      {!isAuthPage && <Sidebar onLogout={handleLogout} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {!isAuthPage && <Topbar onLogout={handleLogout} />}

        <div className="flex-1 overflow-auto px-4 py-2">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route
              path='/uploads'
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
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/history' element={<UploadHistory />} />
            <Route path='/admin' element={<AdminPanel />} />
            <Route path='/auth/login' element={<Login onLogin={handleLogin} />} />
            <Route path='/auth/signup' element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
