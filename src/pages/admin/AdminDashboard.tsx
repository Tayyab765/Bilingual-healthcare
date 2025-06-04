import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Bell, User, MoreVertical, Settings, LogOut, Filter, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import AdminSidebar from '@/components/AdminSidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Dashboard stats
  const [totalAppointments, setTotalAppointments] = useState(75);
  const [uniquePatients, setUniquePatients] = useState(57);
  const [totalCanceled, setTotalCanceled] = useState(65);
  const [totalRevenue, setTotalRevenue] = useState(128);
  
  // Appointment filters
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New appointment",
      message: "Dr. Ali has a new appointment",
      time: "5 min ago",
      read: false
    },
    {
      id: 2,
      title: "Payment received",
      message: "Payment of $150 received from Waleed",
      time: "1 hour ago",
      read: false
    },
    {
      id: 3,
      title: "Doctor verification",
      message: "Dr. Ahmed submitted verification documents",
      time: "2 hours ago",
      read: true
    }
  ]);

  // Example appointments data
  const appointments = [
    {
      patientName: "Hamza",
      doctorName: "Dr. Ali",
      checkup: "Fever",
      date: "01-02-2025",
      time: "02:30 PM",
      status: "Completed"
    },
    {
      patientName: "Waleed",
      doctorName: "Dr. Ahmad",
      checkup: "Headache",
      date: "15-02-2025",
      time: "03:30 PM",
      status: "Pending"
    },
    {
      patientName: "Tayyab",
      doctorName: "Prof. Junaid",
      checkup: "Allergy",
      date: "15-03-2025",
      time: "10:30 PM",
      status: "Cancelled"
    },
    {
      patientName: "Saad",
      doctorName: "Dr. Adam",
      checkup: "Ortho",
      date: "05-02-2025",
      time: "10:30 PM",
      status: "Pending"
    },
    {
      patientName: "Ahmed",
      doctorName: "Dr. Ali",
      checkup: "Cold & Flu",
      date: "03-02-2025",
      time: "09:15 AM",
      status: "Completed"
    },
    {
      patientName: "Sarah",
      doctorName: "Dr. Ali",
      checkup: "Annual Physical",
      date: "12-02-2025",
      time: "11:00 AM",
      status: "Pending"
    },
    {
      patientName: "Fatima",
      doctorName: "Dr. Ahmad",
      checkup: "Blood Pressure",
      date: "18-02-2025",
      time: "04:45 PM",
      status: "Completed"
    }
  ];

  // Extract unique doctor names for the filter dropdown
  const doctorsList = ['all', ...new Set(appointments.map(app => app.doctorName))];
  
  // Group appointments by doctor
  const appointmentsByDoctor = appointments.reduce((acc, appointment) => {
    if (!acc[appointment.doctorName]) {
      acc[appointment.doctorName] = [];
    }
    acc[appointment.doctorName].push(appointment);
    return acc;
  }, {});

  // Handler for marking notifications as read
  const handleMarkAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Apply filters to appointments
  useEffect(() => {
    let result = [...appointments];
    
    // Filter by doctor
    if (selectedDoctor !== 'all') {
      result = result.filter(app => app.doctorName === selectedDoctor);
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(app => app.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(app => 
        app.patientName.toLowerCase().includes(query) || 
        app.doctorName.toLowerCase().includes(query) || 
        app.checkup.toLowerCase().includes(query)
      );
    }
    
    setFilteredAppointments(result);
  }, [selectedDoctor, statusFilter, searchQuery, appointments]);

  // Get statistics for the selected doctor
  const getSelectedDoctorStats = () => {
    if (selectedDoctor === 'all') return null;
    
    const doctorApps = appointmentsByDoctor[selectedDoctor] || [];
    const completed = doctorApps.filter(app => app.status === 'Completed').length;
    const pending = doctorApps.filter(app => app.status === 'Pending').length;
    const cancelled = doctorApps.filter(app => app.status === 'Cancelled').length;
    
    return {
      total: doctorApps.length,
      completed,
      pending,
      cancelled
    };
  };

  // Get selected doctor stats
  const selectedDoctorStats = getSelectedDoctorStats();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden pl-64">
        <div className="bg-white shadow-sm z-10 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          
          {/* Notification and Profile Icons */}
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500" 
                      variant="destructive"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between p-2">
                  <p className="text-sm font-medium">Notifications</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleMarkAsRead}
                    disabled={unreadCount === 0}
                  >
                    Mark all as read
                  </Button>
                </div>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-3 ${!notification.read ? 'bg-blue-50' : ''} hover:bg-gray-100 cursor-pointer`}
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                )}
                <DropdownMenuSeparator />
                <div className="p-2 text-center">
                  <Button variant="ghost" size="sm" className="w-full text-sm">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Profile Icon */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-healthcare-primary text-white">
                      A
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center gap-2 p-2">
                  <Avatar>
                    <AvatarFallback className="bg-healthcare-primary text-white">A</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-gray-500">admin@healthcare.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {/* Removed the "My Profile" option */}
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/admin/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600 focus:text-red-500" 
                  onClick={() => {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('isDoctor');
                    navigate('/login');
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Appointments */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">{totalAppointments}</p>
                    <p className="text-sm text-gray-500">Total Appointments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Unique Patients */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">{uniquePatients}</p>
                    <p className="text-sm text-gray-500">Unique Patients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Total Canceled */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">{totalCanceled}</p>
                    <p className="text-sm text-gray-500">Total Canceled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Total Revenue */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.31 11.14C10.54 10.69 9.97 10.2 9.97 9.47C9.97 8.63 10.76 8.04 12.07 8.04C13.45 8.04 13.97 8.7 14.01 9.68H15.72C15.67 8.34 14.85 7.11 13.23 6.71V5H10.9V6.69C9.39 7.01 8.18 7.99 8.18 9.5C8.18 11.29 9.67 12.19 11.84 12.71C13.79 13.17 14.18 13.86 14.18 14.58C14.18 15.11 13.79 15.97 12.08 15.97C10.48 15.97 9.85 15.25 9.76 14.33H8.04C8.14 16.03 9.4 16.99 10.9 17.3V19H13.24V17.33C14.76 17.04 15.96 16.17 15.97 14.56C15.96 12.36 14.07 11.6 12.31 11.14Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">${totalRevenue}</p>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Pie Charts - Removed Chart/Value toggle buttons */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Pie Chart</h2>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-24 h-24">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f3f3" strokeWidth="3"></circle>
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#FF5C5C" strokeWidth="3" 
                          strokeDasharray="100 0" strokeDashoffset="0" className="circle">
                        </circle>
                        <text x="18" y="20" textAnchor="middle" fontSize="8" fill="black" fontWeight="bold">81%</text>
                      </svg>
                    </div>
                    <p className="mt-2 text-sm font-medium">Total Appointment</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-24 h-24">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f3f3" strokeWidth="3"></circle>
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#22c55e" strokeWidth="3" 
                          strokeDasharray="25 75" strokeDashoffset="0" className="circle">
                        </circle>
                        <text x="18" y="20" textAnchor="middle" fontSize="8" fill="black" fontWeight="bold">22%</text>
                      </svg>
                    </div>
                    <p className="mt-2 text-sm font-medium">Customer Growth</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-24 h-24">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f3f3" strokeWidth="3"></circle>
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#3b82f6" strokeWidth="3" 
                          strokeDasharray="82 18" strokeDashoffset="0" className="circle">
                        </circle>
                        <text x="18" y="20" textAnchor="middle" fontSize="8" fill="black" fontWeight="bold">82%</text>
                      </svg>
                    </div>
                    <p className="mt-2 text-sm font-medium">Total Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Line Chart - Removed Save Report button */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Chart Appointments</h2>
                </div>
                
                <div className="h-64 relative">
                  <div className="absolute left-0 top-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                      <span>5 Appointments</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">09:00 AM</div>
                  </div>
                  
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    {/* X-axis days */}
                    <text x="20" y="190" fontSize="10" fill="#888">Sunday</text>
                    <text x="75" y="190" fontSize="10" fill="#888">Monday</text>
                    <text x="130" y="190" fontSize="10" fill="#888">Tuesday</text>
                    <text x="185" y="190" fontSize="10" fill="#888">Wednesday</text>
                    <text x="240" y="190" fontSize="10" fill="#888">Thursday</text>
                    <text x="295" y="190" fontSize="10" fill="#888">Friday</text>
                    <text x="350" y="190" fontSize="10" fill="#888">Saturday</text>
                    
                    {/* Chart line */}
                    <path 
                      d="M20,120 L70,100 L120,80 L170,100 L220,70 L270,90 L320,50 L370,80" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="2"
                    />
                    
                    {/* Filled area under the line */}
                    <path 
                      d="M20,120 L70,100 L120,80 L170,100 L220,70 L270,90 L320,50 L370,80 L370,170 L20,170 Z" 
                      fill="url(#gradient)" 
                      opacity="0.2"
                    />
                    
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Data points */}
                    <circle cx="20" cy="120" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="70" cy="100" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="120" cy="80" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="170" cy="100" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="220" cy="70" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="270" cy="90" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="320" cy="50" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="370" cy="80" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Appointments Table with Filters */}
          <div className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-lg font-medium mb-4 md:mb-0">Appointments</h2>
                  
                  {/* Filter controls */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Doctor filter */}
                    <div className="w-full sm:w-52">
                      <Select 
                        value={selectedDoctor} 
                        onValueChange={setSelectedDoctor}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Filter by doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctorsList.map((doctor) => (
                            <SelectItem key={doctor} value={doctor}>
                              {doctor === 'all' ? 'All Doctors' : doctor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Status filter */}
                    <div className="w-full sm:w-44">
                      <Select 
                        value={statusFilter} 
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Search field */}
                    <div className="w-full sm:w-64 relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search appointments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 h-9"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Doctor Statistics Card (appears when a doctor is selected) */}
                {selectedDoctorStats && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
                    <h3 className="font-medium mb-2">{selectedDoctor} Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p className="text-sm text-gray-500">Total Appointments</p>
                        <p className="text-xl font-bold">{selectedDoctorStats.total}</p>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p className="text-sm text-gray-500">Completed</p>
                        <p className="text-xl font-bold text-green-600">{selectedDoctorStats.completed}</p>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-xl font-bold text-yellow-600">{selectedDoctorStats.pending}</p>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p className="text-sm text-gray-500">Cancelled</p>
                        <p className="text-xl font-bold text-red-600">{selectedDoctorStats.cancelled}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Patient Name</TableHead>
                        <TableHead className="w-[150px]">Doctor Name</TableHead>
                        <TableHead className="w-[100px]">Check Up</TableHead>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="w-[100px]">Time</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment, index) => (
                          <TableRow key={index}>
                            <TableCell>{appointment.patientName}</TableCell>
                            <TableCell>{appointment.doctorName}</TableCell>
                            <TableCell>{appointment.checkup}</TableCell>
                            <TableCell>{appointment.date}</TableCell>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {appointment.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No appointments found matching your filters
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Results count */}
                <div className="mt-4 text-sm text-gray-500">
                  Showing {filteredAppointments.length} of {appointments.length} appointments
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
