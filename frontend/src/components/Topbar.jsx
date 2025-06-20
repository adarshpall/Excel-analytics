import { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/profile');
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout?.();
    navigate('/auth/login');
    setShowDropdown(false);
  };

  return (
    <motion.div
      className="h-16 w-full bg-gray-900/60 backdrop-blur-md border-b border-gray-800 flex items-center px-6 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between w-full">
        {/* Left: Search */}
        <div className="relative w-52 md:w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-800 text-sm text-gray-100 pl-4 pr-10 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <div className="absolute right-3 top-2.5 text-gray-400">
            <Search size={18} />
          </div>
        </div>

        {/* Right: Notifications and Profile */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Bell size={20} className="text-white" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              <User size={20} className="text-white" />
            </motion.button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50"
                >
                  <div className="p-2">
                    <button
                      onClick={handleProfile}
                      className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md text-left transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md text-left transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Topbar;
