import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ListChecks, 
  Users, 
  UserCheck, 
  Settings,
  Menu, 
  X,
  LogOut,
  ShieldCheck,
  CreditCard // Changed from BarChart to CreditCard for payment
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
    // For admin module, always keep sidebar open on desktop
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
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  };


  return (
    <>
      {/* Mobile toggle button - only visible on mobile */}
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
          {/* Sidebar header with logo only - removed Admin text */}
          <div className="p-4 flex items-center">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center">
                <Logo />
              </Link>
            </div>
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
                }`}
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </Link>
              
              <Link 
                to="/admin/appointments" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  location.pathname === '/admin/appointments' 
                    ? 'bg-healthcare-light text-healthcare-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ListChecks className="h-5 w-5 mr-3" />
                <span>Appointments</span>
              </Link>
              
              <Link 
                to="/admin/patients" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  location.pathname === '/admin/patients' 
                    ? 'bg-healthcare-light text-healthcare-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users className="h-5 w-5 mr-3" />
                <span>Patients</span>
              </Link>
              
              <Link 
                to="/admin/doctors" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  location.pathname === '/admin/doctors' 
                    ? 'bg-healthcare-light text-healthcare-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <UserCheck className="h-5 w-5 mr-3" />
                <span>Doctors</span>
              </Link>
              
              {/* New Verify Doctors Option */}
              <Link 
                to="/admin/verify-doctors" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  location.pathname === '/admin/verify-doctors' 
                    ? 'bg-healthcare-light text-healthcare-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShieldCheck className="h-5 w-5 mr-3" />
                <span>Verify Doctors</span>
              </Link>
              
              <Link 
                to="/admin/payments" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  location.pathname === '/admin/payments' 
                    ? 'bg-healthcare-light text-healthcare-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                <span>Payments</span>
              </Link>
              
              <Link 
                to="/admin/settings" 
                className={`flex items-center px-3 py-2 rounded-md ${
                  location.pathname === '/admin/settings' 
                    ? 'bg-healthcare-light text-healthcare-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
          
          {/* Logout */}
          <div className="p-4 border-t">
            <Link 
              to="/login" 
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
