import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Video, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import AppointmentCancelDialog from '@/components/AppointmentCancelDialog';

// Type for appointment data
interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
  notes: string;
  type?: 'physical' | 'online';
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = '/login';
    }

    // Load appointments from localStorage
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    } else {
      // If no appointments in localStorage, use mock data
      setAppointments(mockAppointments);
    }
  }, []);

  const openCancelDialog = (id: number) => {
    setAppointmentToCancel(id);
  };

  const closeCancelDialog = () => {
    setAppointmentToCancel(null);
  };

  const handleCancelAppointment = () => {
    if (appointmentToCancel === null) return;
    
    // Filter out the cancelled appointment
    const updatedAppointments = appointments.filter(appt => appt.id !== appointmentToCancel);
    
    // Update state and localStorage
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Show toast notification
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully.",
    });

    // Close the dialog
    closeCancelDialog();
  };

  const handleBookNewAppointment = () => {
    navigate('/doctors');
  };

  const getAppointmentTypeIcon = (type?: string) => {
    if (type === 'online') {
      return <Video className="h-4 w-4 text-blue-500" />;
    } else {
      return <MapPin className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">My Appointments</h1>
            <p className="text-gray-500">Manage your upcoming appointments</p>
          </div>
          
          <div className="flex justify-end mb-6">
            <Button 
              className="bg-healthcare-primary hover:bg-healthcare-secondary"
              onClick={handleBookNewAppointment}
            >
              Book New Appointment
            </Button>
          </div>
          
          {appointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Appointments</h3>
              <p className="text-gray-500 mb-6">You don't have any upcoming appointments scheduled.</p>
              <Button 
                className="bg-healthcare-primary hover:bg-healthcare-secondary"
                onClick={handleBookNewAppointment}
              >
                Find a Doctor
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {isMobile ? (
                <div className="divide-y divide-gray-200">
                  {appointments.map(appointment => (
                    <div key={appointment.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{appointment.doctor}</h3>
                        <div className="flex items-center">
                          {appointment.type && getAppointmentTypeIcon(appointment.type)}
                          <span className="ml-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {appointment.date}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {appointment.time}
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 border-red-200 hover:bg-red-50"
                          onClick={() => openCancelDialog(appointment.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map(appointment => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.doctor}</TableCell>
                        <TableCell>{appointment.specialty}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {appointment.type ? (
                              <>
                                {getAppointmentTypeIcon(appointment.type)}
                                <span className="ml-1">{appointment.type === 'online' ? 'Online' : 'Physical'}</span>
                              </>
                            ) : (
                              <span>In-person</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {appointment.notes}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 border-red-200 hover:bg-red-50"
                            onClick={() => openCancelDialog(appointment.id)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          )}
          
          {/* Confirmation Dialog */}
          <AppointmentCancelDialog 
            isOpen={appointmentToCancel !== null}
            onClose={closeCancelDialog}
            onConfirm={handleCancelAppointment}
          />
        </main>
      </div>
    </div>
  );
};

// Mock data for appointments (will be used if localStorage is empty)
const mockAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2023-09-15",
    time: "09:30 AM",
    status: "Upcoming",
    notes: "Annual heart checkup",
    type: "physical" as const,
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: "2023-09-18",
    time: "02:15 PM",
    status: "Upcoming",
    notes: "Skin condition follow-up",
    type: "online" as const,
  },
  {
    id: 5,
    doctor: "Dr. Lisa Taylor",
    specialty: "Psychiatrist",
    date: "2023-09-22",
    time: "10:30 AM",
    status: "Upcoming",
    notes: "Therapy session",
    type: "physical" as const,
  }
];

export default Appointments;
