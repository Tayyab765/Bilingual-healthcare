import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Users, Clock, FileText, Settings, ListChecks, LayoutDashboard, MessageSquare, Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import Sidebar from '@/components/Sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
  
  // State for notifications and messages
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New appointment",
      message: "You have a new appointment with John Doe",
      time: "5 min ago",
      read: false
    },
    {
      id: 2,
      title: "Appointment cancelled",
      message: "Sarah Smith has cancelled her appointment for tomorrow",
      time: "1 hour ago",
      read: false
    },
    {
      id: 3,
      title: "Lab results available",
      message: "Lab results for patient Michael Johnson are now available",
      time: "2 hours ago",
      read: true
    }
  ]);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John Doe",
      preview: "Hello doctor, I have a question about my prescription...",
      avatar: "",
      time: "10 min ago",
      read: false
    },
    {
      id: 2,
      sender: "Sarah Smith",
      preview: "Thank you for the consultation yesterday. I'm feeling much better...",
      avatar: "",
      time: "1 day ago",
      read: false
    },
    {
      id: 3,
      sender: "Emily Johnson",
      preview: "When should I schedule my follow-up appointment?",
      avatar: "",
      time: "2 days ago",
      read: true
    },
    {
      id: 4,
      sender: "Michael Brown",
      preview: "I've uploaded my latest blood test results to the portal.",
      avatar: "",
      time: "3 days ago",
      read: true
    },
    {
      id: 5,
      sender: "Lisa Taylor",
      preview: "Is it normal to experience these side effects?",
      avatar: "",
      time: "5 days ago",
      read: true
    }
  ]);
  
  // Count unread notifications and messages
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = messages.filter(m => !m.read).length;
  
  // Function to mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };
  
  // Function to mark all messages as read
  const markAllMessagesAsRead = () => {
    setMessages(messages.map(message => ({
      ...message,
      read: true
    })));
    toast({
      title: "Messages marked as read",
      description: "All messages have been marked as read.",
    });
  };
  
  // Function to mark a single notification as read
  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  // Function to mark a single message as read
  const markMessageAsRead = (id) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    ));
  };
  
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
                {/* Notification dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all duration-200">
                      <Bell className="h-5 w-5" />
                      {unreadNotifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {unreadNotifications}
                        </span>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between p-3 border-b">
                      <h3 className="font-medium">Notifications</h3>
                      {unreadNotifications > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={markAllNotificationsAsRead}
                          className="text-xs text-blue-500 hover:text-blue-700"
                        >
                          Mark all as read
                        </Button>
                      )}
                    </div>
                    
                    <div className="max-h-[380px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-3 hover:bg-gray-50 border-b last:border-0 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex justify-between mb-1">
                              <p className="font-medium text-sm">{notification.title}</p>
                              <span className="text-xs text-gray-400">{notification.time}</span>
                            </div>
                            <p className="text-xs text-gray-500">{notification.message}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No notifications to display
                        </div>
                      )}
                    </div>
                    
                    <div className="p-2 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full text-xs text-blue-500 hover:text-blue-700"
                        onClick={() => navigate('/doctor/notifications')}
                      >
                        View all notifications
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Messages dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative p-2 rounded-full bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition-all duration-200">
                      <MessageSquare className="h-5 w-5" />
                      {unreadMessages > 0 && (
                        <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {unreadMessages}
                        </span>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between p-3 border-b">
                      <h3 className="font-medium">Messages</h3>
                      {unreadMessages > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={markAllMessagesAsRead}
                          className="text-xs text-indigo-500 hover:text-indigo-700"
                        >
                          Mark all as read
                        </Button>
                      )}
                    </div>
                    
                    <div className="max-h-[380px] overflow-y-auto">
                      {messages.length > 0 ? (
                        messages.map((message) => (
                          <div 
                            key={message.id}
                            className={`p-3 hover:bg-gray-50 border-b last:border-0 cursor-pointer ${!message.read ? "bg-indigo-50" : ""}`}
                            onClick={() => {
                              markMessageAsRead(message.id);
                              navigate('/doctor/chat');
                            }}
                          >
                            <div className="flex items-center gap-3 mb-1">
                              <Avatar className="h-8 w-8">
                                {message.avatar ? (
                                  <AvatarImage src={message.avatar} alt={message.sender} />
                                ) : (
                                  <AvatarFallback className="bg-indigo-100 text-indigo-600">
                                    {message.sender.charAt(0)}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <p className="font-medium text-sm">{message.sender}</p>
                                  <span className="text-xs text-gray-400">{message.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                              </div>
                              {!message.read && (
                                <Badge variant="outline" className="h-2 w-2 rounded-full bg-indigo-500"></Badge>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No messages to display
                        </div>
                      )}
                    </div>
                    
                    <div className="p-2 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full text-xs text-indigo-500 hover:text-indigo-700"
                        onClick={() => navigate('/doctor/chat')}
                      >
                        View all messages
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
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
