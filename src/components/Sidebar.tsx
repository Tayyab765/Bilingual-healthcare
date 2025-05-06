import React, { useState, useEffect } from 'react';
import { FileText, Home, MessageSquare, Settings, User, ListChecks, X, Menu, LogOut, History, Users, Clock } from 'lucide-react';
import Logo from './Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const doctor = localStorage.getItem('isDoctor') === 'true';
    const admin = localStorage.getItem('isAdmin') === 'true';
    
    setIsLoggedIn(loggedIn);
    setIsDoctor(doctor);
    setIsAdmin(admin);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isDoctor');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

  // We'll keep this function for programmatic navigation
  const handleSettingsClick = () => {
    navigate('/doctor/settings');
  };

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Don't render sidebar if user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  // If user is admin, don't show this sidebar (they should use AdminSidebar)
  if (isAdmin) {
    return null;
  }

  // Doctor sidebar menu items
  const doctorMenuItems = [
    {
      to: "/doctor/dashboard",
      icon: <Home size={20} />,
      text: "Dashboard",
      active: location.pathname === '/doctor/dashboard'
    },
    {
      to: "/doctor/appointments",
      icon: <ListChecks size={20} />,
      text: "Appointments",
      active: location.pathname === '/doctor/appointments'
    },
    {
      to: "/doctor/patients",
      icon: <Users size={20} />,
      text: "Patients",
      active: location.pathname === '/doctor/patients'
    },
    {
      to: "/doctor/availability",
      icon: <Clock size={20} />,
      text: "Availability",
      active: location.pathname === '/doctor/availability'
    },
    {
      to: "/doctor/prescriptions",
      icon: <FileText size={20} />,
      text: "Prescriptions",
      active: location.pathname === '/doctor/prescriptions'
    },
    {
      to: "/doctor/chat",
      icon: <MessageSquare size={20} />,
      text: "Chat",
      active: location.pathname === '/doctor/chat'
    },
    {
      to: "/doctor/settings",
      icon: <Settings size={20} />,
      text: "Settings",
      active: location.pathname === '/doctor/settings'
    }
  ];

  // Patient sidebar menu items
  const patientMenuItems = [
    {
      to: "/dashboard",
      icon: <Home size={20} />,
      text: "Home",
      active: location.pathname === '/dashboard'
    },
    {
      to: "/appointments",
      icon: <ListChecks size={20} />,
      text: "Appointments",
      active: location.pathname === '/appointments'
    },
    {
      to: "/doctors",
      icon: <User size={20} />,
      text: "Doctors",
      active: location.pathname === '/doctors'
    },
    {
      to: "/chat",
      icon: <MessageSquare size={20} />,
      text: "Chat",
      active: location.pathname === '/chat'
    },
    {
      to: "/prescriptions",
      icon: <FileText size={20} />,
      text: "Prescriptions",
      active: location.pathname === '/prescriptions'
    },
    {
      to: "/history",
      icon: <History size={20} />,
      text: "History",
      active: location.pathname === '/history'
    },
    {
      to: "/settings",
      icon: <Settings size={20} />,
      text: "Settings",
      active: location.pathname === '/settings'
    }
  ];

  // Choose the appropriate menu items based on whether a doctor is logged in
  const menuItems = isDoctor ? doctorMenuItems : patientMenuItems;

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
                <Link to={item.to} className={`sidebar-item ${item.active ? 'active' : ''}`}>
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-3">
          <button 
            onClick={handleLogout}
            className="sidebar-item text-red-500 hover:bg-red-50 w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Add a spacer div to push content to the right of sidebar on desktop */}
      <div className={`${isMobile ? 'hidden' : 'block'} w-64 flex-shrink-0`}></div>
    </>
  );
};

export default Sidebar;
