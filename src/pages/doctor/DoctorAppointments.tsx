import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';

const appointmentData = [
  {
    id: "1",
    patientName: "John Doe",
    patientEmail: "john.doe@example.com",
    date: "Apr 15, 2025",
    time: "10:00 AM",
    duration: "30 min",
    status: "Confirmed",
    type: "Check-up"
  },
  {
    id: "2",
    patientName: "Jane Smith",
    patientEmail: "jane.smith@example.com",
    date: "Apr 16, 2025",
    time: "2:30 PM",
    duration: "45 min",
    status: "Confirmed",
    type: "Follow-up"
  },
  {
    id: "3",
    patientName: "Michael Johnson",
    patientEmail: "michael.johnson@example.com",
    date: "Apr 17, 2025",
    time: "11:15 AM",
    duration: "30 min",
    status: "Pending",
    type: "Consultation"
  },
  {
    id: "4",
    patientName: "Emily Davis",
    patientEmail: "emily.davis@example.com",
    date: "Apr 18, 2025",
    time: "9:00 AM",
    duration: "60 min",
    status: "Confirmed",
    type: "Treatment"
  },
  {
    id: "5",
    patientName: "Robert Wilson",
    patientEmail: "robert.wilson@example.com",
    date: "Apr 19, 2025",
    time: "3:45 PM",
    duration: "30 min",
    status: "Canceled",
    type: "Check-up"
  }
];

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(appointmentData);
  const [filter, setFilter] = useState('all'); // 'all', 'confirmed', 'pending', 'canceled'

  useEffect(() => {
    const isDoctor = localStorage.getItem('isDoctor') === 'true';
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn || !isDoctor) {
      toast({
        title: "Access denied",
        description: "Please login as a doctor to access this page.",
        variant: "destructive",
      });
      navigate('/doctor/login');
    }
  }, [navigate, toast]);

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(appointment => 
        appointment.status.toLowerCase() === filter.toLowerCase());

  const getStatusStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-semibold text-gray-800">Appointment List</h1>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>All Appointments</CardTitle>
                  <CardDescription>View and manage all your patient appointments</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant={filter === 'all' ? 'default' : 'outline'} 
                    onClick={() => setFilter('all')}
                    size="sm"
                  >
                    All
                  </Button>
                  <Button 
                    variant={filter === 'confirmed' ? 'default' : 'outline'}
                    onClick={() => setFilter('confirmed')}
                    size="sm"
                  >
                    Confirmed
                  </Button>
                  <Button 
                    variant={filter === 'pending' ? 'default' : 'outline'}
                    onClick={() => setFilter('pending')}
                    size="sm"
                  >
                    Pending
                  </Button>
                  <Button 
                    variant={filter === 'canceled' ? 'default' : 'outline'}
                    onClick={() => setFilter('canceled')}
                    size="sm"
                  >
                    Canceled
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium">{appointment.patientName}</div>
                            <div className="text-sm text-gray-500">{appointment.patientEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                          <span>{appointment.date}</span>
                          <Clock className="ml-3 mr-2 h-4 w-4 text-gray-400" />
                          <span>{appointment.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>{appointment.duration}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DoctorAppointments;
