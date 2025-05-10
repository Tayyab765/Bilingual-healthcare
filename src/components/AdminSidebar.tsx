import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ListChecks, 
  Users, 
  UserCheck, 
  BarChart, 
  Settings,
  Menu, 
  X,
  LogOut
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
  };


  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button 
          onClick={toggleSidebar} 
          className="fixed bottom-4 right-4 z-50 bg-healthcare-primary text-white p-3 rounded-full shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}
    
      <div className="bg-white border-r shadow-sm h-screen fixed top-0 left-0 z-40 w-64">
        <div className="flex flex-col h-full">
          {/* Sidebar header with logo */}
          <div className="p-4 flex items-center justify-between">
            <div className={`flex items-center ${!isOpen && 'md:justify-center'}`}>
              <Link to="/admin" className="flex items-center">
                <Logo />
                {isOpen && <span className="ml-2 font-semibold text-xl">Admin</span>}
              </Link>
            </div>
            {!isMobile && isOpen && (
              <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            )}
          </div>
          
          {/* Navigation links */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              <Link 
                to="/admin" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  location.pathname === '/admin' 
                    ? 'bg-healthcare-light text-healthcare-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                } ${!isOpen && 'md:justify-center'}`}
              >
                <LayoutDashboard className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
                {isOpen && <span>Dashboard</span>}
              </Link>
              
              <Link 
                to="/admin/appointments" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  location.pathname === '/admin/appointments' 
                    ? 'bg-healthcare-light text-healthcare-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                } ${!isOpen && 'md:justify-center'}`}
              >
                <ListChecks className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
                {isOpen && <span>Appointments</span>}
              </Link>
              
              <Link 
                to="/admin/patients" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  location.pathname === '/admin/patients' 
                    ? 'bg-healthcare-light text-healthcare-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                } ${!isOpen && 'md:justify-center'}`}
              >
                <Users className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
                {isOpen && <span>Patients</span>}
              </Link>
              
              <Link 
                to="/admin/doctors" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  location.pathname === '/admin/doctors' 
                    ? 'bg-healthcare-light text-healthcare-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                } ${!isOpen && 'md:justify-center'}`}
              >
                <UserCheck className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
                {isOpen && <span>Doctors</span>}
              </Link>
              
              <Link 
                to="/admin/analytics" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  location.pathname === '/admin/analytics' 
                    ? 'bg-healthcare-light text-healthcare-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                } ${!isOpen && 'md:justify-center'}`}
              >
                <BarChart className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
                {isOpen && <span>Analytics</span>}
              </Link>
              
              <Link 
                to="/admin/settings" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  location.pathname === '/admin/settings' 
                    ? 'bg-healthcare-light text-healthcare-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                } ${!isOpen && 'md:justify-center'}`}
              >
                <Settings className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
                {isOpen && <span>Settings</span>}
              </Link>
            </nav>
          </div>
          
          {/* Logout */}
          <div className="p-4 border-t">
            <Link 
              to="/login" 
              onClick={handleLogout}
              className={`flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${!isOpen && 'md:justify-center'}`}
            >
              <LogOut className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
              {isOpen && <span>Logout</span>}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
