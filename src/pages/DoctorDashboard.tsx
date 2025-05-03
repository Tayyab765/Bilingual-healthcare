
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Users, Clock, FileText, Settings, ListChecks, LayoutDashboard, MessageSquare, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import Sidebar from '@/components/Sidebar';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [doctorName, setDoctorName] = useState('Doctor');
  const [pendingAppointments, setPendingAppointments] = useState(3);
  
  // Dashboard stats
  const [totalAppointments, setTotalAppointments] = useState(75);
  const [uniquePatients, setUniquePatients] = useState(57);
  const [totalCanceled, setTotalCanceled] = useState(65);
  const [totalRevenue, setTotalRevenue] = useState(128);
  
  useEffect(() => {
    // Check if logged in as doctor
    const isDoctor = localStorage.getItem('isDoctor') === 'true';
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn || !isDoctor) {
      toast({
        title: "Access denied",
        description: "Please login as a doctor to access this page.",
        variant: "destructive",
      });
      navigate('/doctor/login');
      return;
    }
    
    // Get doctor name from local storage
    const name = localStorage.getItem('userName');
    if (name) {
      setDoctorName(name);
    }
  }, [navigate, toast]);
  
  // Example upcoming appointments data
  const upcomingAppointments = [
    {
      patientName: "John Doe",
      dateTime: "Apr 15, 2025 at 10:00 AM",
      duration: "30 min",
      status: "Confirmed"
    },
    {
      patientName: "Jane Smith",
      dateTime: "Apr 16, 2025 at 2:30 PM",
      duration: "45 min",
      status: "Confirmed"
    },
    {
      patientName: "Michael Johnson",
      dateTime: "Apr 17, 2025 at 11:15 AM",
      duration: "30 min",
      status: "Pending"
    }
  ];
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Notification button */}
                <button className="relative p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all duration-200">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>
                
                {/* Chat button */}
                <button className="relative p-2 rounded-full bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition-all duration-200">
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
                </button>
                
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <div className="ml-3 relative">
                    <div>
                      <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">Dr. {doctorName}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Appointments */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">{totalAppointments}</p>
                    <p className="text-sm text-gray-500">Total Appointments</p>
                    <p className="text-xs text-gray-400 mt-1">All time stats</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Unique Patients */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">{uniquePatients}</p>
                    <p className="text-sm text-gray-500">Unique Patients</p>
                    <p className="text-xs text-gray-400 mt-1">All time stats</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Total Canceled */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">{totalCanceled}</p>
                    <p className="text-sm text-gray-500">Total Canceled</p>
                    <p className="text-xs text-gray-400 mt-1">All time stats</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Total Revenue */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center">
                    <svg className="h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.31 11.14C10.54 10.69 9.97 10.2 9.97 9.47C9.97 8.63 10.76 8.04 12.07 8.04C13.45 8.04 13.97 8.7 14.01 9.68H15.72C15.67 8.34 14.85 7.11 13.23 6.71V5H10.9V6.69C9.39 7.01 8.18 7.99 8.18 9.5C8.18 11.29 9.67 12.19 11.84 12.71C13.79 13.17 14.18 13.86 14.18 14.58C14.18 15.11 13.79 15.97 12.08 15.97C10.48 15.97 9.85 15.25 9.76 14.33H8.04C8.14 16.03 9.4 16.99 10.9 17.3V19H13.24V17.33C14.76 17.04 15.96 16.17 15.97 14.56C15.96 12.36 14.07 11.6 12.31 11.14Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">${totalRevenue}</p>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-xs text-gray-400 mt-1">All time stats</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming Appointments Section */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {upcomingAppointments.map((appointment, index) => (
                  <li key={index}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          Patient: {appointment.patientName}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {appointment.duration} consultation
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>
                            {appointment.dateTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
