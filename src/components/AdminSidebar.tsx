import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ListChecks, 
  Users, 
  User, 
  BarChart, 
  Settings,
  Menu, 
  X,
  LogOut,
  UserCheck
} from 'lucide-react';
import Logo from './Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isDoctor');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  if (!isLoggedIn) {
    return null;
  }

  // Admin sidebar menu items (updated)
  const menuItems = [
    {
      to: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />,
      text: "Dashboard",
      active: location.pathname === '/admin/dashboard'
    },
    {
      to: "/admin/appointment-list",
      icon: <ListChecks size={18} />,
      text: "Appointment List",
      active: location.pathname === '/admin/appointment-list'
    },
    {
      to: "/admin/patients",
      icon: <Users size={18} />,
      text: "Patients",
      active: location.pathname === '/admin/patients'
    },
    {
      to: "/admin/doctors",
      icon: <User size={18} />,
      text: "Doctors",
      active: location.pathname === '/admin/doctors'
    },
    {
      to: "/admin/verify-doctors",
      icon: <UserCheck size={18} />,
      text: "Verify Doctors",
      active: location.pathname === '/admin/verify-doctors'
    },
    {
      to: "/admin/analytics",
      icon: <BarChart size={18} />,
      text: "Analytics",
      active: location.pathname === '/admin/analytics'
    },
    {
      to: "/admin/settings",
      icon: <Settings size={18} />,
      text: "Settings",
      active: location.pathname === '/admin/settings'
    }
  ];

  return (
    <>
      {isMobile && (
        <button 
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-30 bg-healthcare-primary text-white p-2 rounded-full shadow-md"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      
      <aside className={`w-64 h-screen border-r border-gray-100 py-6 fixed left-0 top-0 bg-white z-20 transition-all duration-300 animate-fade-in ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}>
        <div className="px-6 mb-8">
          <Logo />
        </div>
        
        <nav className="px-3">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.to} 
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                    item.active 
                      ? 'bg-green-50 text-green-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className={`${item.active ? 'text-green-600' : 'text-gray-400'}`}>
                    {item.icon}
                  </div>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-3">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} className="text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Add a spacer div to push content to the right of sidebar on desktop */}
      <div className={`${isMobile ? 'hidden' : 'block'} w-64 flex-shrink-0`}></div>
    </>
  );
};

export default AdminSidebar;
