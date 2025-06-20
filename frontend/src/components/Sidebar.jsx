import {
  BarChart2,
  Upload,
  User,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const SidebarItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    color: "#6366f1",
    path: "/",
  },
  {
    name: "Upload Files",
    icon: Upload,
    color: "#EC4899",
    path: "/uploads",
  },
  {
    name: "Profile",
    icon: User,
    color: "#F59E00",
    path: "/profile",
  },
  {
    name: "Upload History",
    icon: Upload,
    color: "#10B981",
    path: "/history",
  },
  {
    name: "Admin Panel",
    icon: ShieldCheck,
    color: "#F43F5E",
    path: "/admin",
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        !isCollapsed ? `w-64` : `w-20`
      }`}
      animate={{ width: !isCollapsed ? 240 : 80 }}
    >
      <div className="h-full bg-gray-900/60 backdrop-blur-md border-r border-gray-800 shadow-inner flex flex-col">
        {/* Logo and toggle */}
        <div className="flex justify-start items-center gap-3 p-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-all"
          >
            <BarChart2 size={22} className="text-white" />
          </motion.button>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                className="text-xl font-semibold text-white"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                Excel Analytics
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav Items */}
        <nav className="mt-6 flex-1">
          {SidebarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link key={index} to={item.path}>
                <motion.div
                  className={`flex items-center gap-3 px-4 py-3 mx-2 my-1 rounded-lg transition-all cursor-pointer 
                    ${isActive ? "bg-gray-700" : "hover:bg-gray-700/50"}
                  `}
                >
                  <Icon size={20} style={{ color: item.color, minWidth: 20 }} />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        className="text-white text-sm"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
