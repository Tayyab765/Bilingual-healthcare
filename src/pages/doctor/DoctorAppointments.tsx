import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ChevronRight, Mail, Phone, MapPin, FileText, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Sidebar from '@/components/Sidebar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Extended appointment data with more details
const appointmentData = [
  {
    id: "1",
    patientName: "John Doe",
    patientEmail: "john.doe@example.com",
    patientPhone: "+1 (555) 123-4567",
    patientAddress: "123 Main St, Anytown, CA 94123",
    patientAge: 42,
    patientGender: "Male",
    date: "Apr 15, 2025",
    time: "10:00 AM",
    duration: "30 min",
    status: "Confirmed",
    type: "Check-up",
    symptoms: "Persistent cough, mild fever",
    notes: "Patient has history of asthma",
    previousVisit: "Jan 10, 2025"
  },
  {
    id: "2",
    patientName: "Jane Smith",
    patientEmail: "jane.smith@example.com",
    patientPhone: "+1 (555) 987-6543",
    patientAddress: "456 Oak Ave, Somewhere, CA 94321",
    patientAge: 35,
    patientGender: "Female",
    date: "Apr 16, 2025",
    time: "2:30 PM",
    duration: "45 min",
    status: "Confirmed",
    type: "Follow-up",
    symptoms: "Joint pain, stiffness in knees",
    notes: "Post physical therapy assessment",
    previousVisit: "Mar 1, 2025"
  },
  {
    id: "3",
    patientName: "Michael Johnson",
    patientEmail: "michael.johnson@example.com",
    patientPhone: "+1 (555) 234-5678",
    patientAddress: "789 Pine Rd, Elsewhere, CA 94789",
    patientAge: 28,
    patientGender: "Male",
    date: "Apr 17, 2025",
    time: "11:15 AM",
    duration: "30 min",
    status: "Pending",
    type: "Consultation",
    symptoms: "Headaches, blurred vision",
    notes: "First visit, requested blood tests",
    previousVisit: "None"
  },
  {
    id: "4",
    patientName: "Emily Davis",
    patientEmail: "emily.davis@example.com",
    patientPhone: "+1 (555) 876-5432",
    patientAddress: "321 Maple Dr, Nowhere, CA 94567",
    patientAge: 52,
    patientGender: "Female",
    date: "Apr 18, 2025",
    time: "9:00 AM",
    duration: "60 min",
    status: "Confirmed",
    type: "Treatment",
    symptoms: "Back pain, limited mobility",
    notes: "Needs prescription refill",
    previousVisit: "Feb 22, 2025"
  },
  {
    id: "5",
    patientName: "Robert Wilson",
    patientEmail: "robert.wilson@example.com",
    patientPhone: "+1 (555) 345-6789",
    patientAddress: "654 Cedar Ln, Anywhere, CA 94432",
    patientAge: 65,
    patientGender: "Male",
    date: "Apr 19, 2025",
    time: "3:45 PM",
    duration: "30 min",
    status: "Canceled",
    type: "Check-up",
    symptoms: "Annual physical examination",
    notes: "Patient has hypertension",
    previousVisit: "Apr 20, 2024"
  }
];

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(appointmentData);
  const [filter, setFilter] = useState('all'); // 'all', 'confirmed', 'pending', 'canceled'
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // New state for reschedule dialog
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  
  // New state for cancel confirmation dialog
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

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

  useEffect(() => {
    if (selectedAppointment) {
      // Set default reschedule date and time based on the current appointment
      const dateObj = new Date();
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate() + 1).padStart(2, '0'); // Default to tomorrow
      setRescheduleDate(`${year}-${month}-${day}`);
    }
  }, [selectedAppointment]);

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
      case 'rescheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };
  
  // Function to handle opening the cancel dialog
  const handleOpenCancelDialog = () => {
    setIsCancelDialogOpen(true);
    setIsDialogOpen(false); // Close the appointment dialog
  };
  
  // Function to handle confirming appointment cancellation
  const handleConfirmCancel = () => {
    if (!selectedAppointment) return;
    
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === selectedAppointment.id 
        ? { 
            ...appointment, 
            status: 'Canceled',
            notes: appointment.notes + (cancelReason ? `\nCancellation reason: ${cancelReason}` : '\nCancelled by doctor')
          }
        : appointment
    );
    
    setAppointments(updatedAppointments);
    setIsCancelDialogOpen(false);
    
    toast({
      title: "Appointment Canceled",
      description: `Appointment with ${selectedAppointment.patientName} has been canceled.`,
    });
    
    setCancelReason('');
  };
  
  // Function to handle opening the reschedule dialog
  const handleOpenRescheduleDialog = () => {
    setIsRescheduleDialogOpen(true);
    setIsDialogOpen(false); // Close the appointment dialog
  };
  
  // Function to handle confirming appointment rescheduling
  const handleConfirmReschedule = () => {
    if (!selectedAppointment || !rescheduleDate || !rescheduleTime) {
      toast({
        title: "Information Required",
        description: "Please select a date and time for rescheduling.",
        variant: "destructive",
      });
      return;
    }
    
    // Format the date to display format (Apr 15, 2025)
    const dateObj = new Date(rescheduleDate);
    const month = dateObj.toLocaleString('en-US', { month: 'short' });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === selectedAppointment.id 
        ? { 
            ...appointment, 
            date: formattedDate,
            time: rescheduleTime,
            status: 'Rescheduled',
            notes: appointment.notes + `\nRescheduled to ${formattedDate} at ${rescheduleTime}`
          }
        : appointment
    );
    
    setAppointments(updatedAppointments);
    setIsRescheduleDialogOpen(false);
    
    toast({
      title: "Appointment Rescheduled",
      description: `Appointment with ${selectedAppointment.patientName} has been rescheduled to ${formattedDate} at ${rescheduleTime}.`,
    });
  };
  
  // Function to confirm a pending appointment
  const handleConfirmAppointment = () => {
    if (!selectedAppointment) return;
    
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === selectedAppointment.id 
        ? { ...appointment, status: 'Confirmed' }
        : appointment
    );
    
    setAppointments(updatedAppointments);
    setIsDialogOpen(false);
    
    toast({
      title: "Appointment Confirmed",
      description: `Appointment with ${selectedAppointment.patientName} has been confirmed.`,
    });
  };
  
  // Function to decline a pending appointment
  const handleDeclineAppointment = () => {
    if (!selectedAppointment) return;
    
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === selectedAppointment.id 
        ? { 
            ...appointment, 
            status: 'Canceled',
            notes: appointment.notes + '\nDeclined by doctor'
          }
        : appointment
    );
    
    setAppointments(updatedAppointments);
    setIsDialogOpen(false);
    
    toast({
      title: "Appointment Declined",
      description: `Appointment with ${selectedAppointment.patientName} has been declined.`,
    });
  };

  // Available time slots for rescheduling
  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

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
                  <Button 
                    variant={filter === 'rescheduled' ? 'default' : 'outline'}
                    onClick={() => setFilter('rescheduled')}
                    size="sm"
                  >
                    Rescheduled
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewAppointment(appointment)}
                        >
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

      {/* Appointment Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              Complete information about the appointment and patient
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-6">
              {/* Appointment Status */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Appointment #{selectedAppointment.id}</h3>
                <Badge 
                  className={`${
                    selectedAppointment.status === 'Confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                    selectedAppointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : 
                    selectedAppointment.status === 'Rescheduled' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : 
                    'bg-red-100 text-red-800 hover:bg-red-100'
                  }`}
                >
                  {selectedAppointment.status}
                </Badge>
              </div>
              
              {/* Appointment Details Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-3">APPOINTMENT DETAILS</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Date</p>
                      <p className="text-sm text-gray-600">{selectedAppointment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Time & Duration</p>
                      <p className="text-sm text-gray-600">
                        {selectedAppointment.time} ({selectedAppointment.duration})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="w-5 h-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Appointment Type</p>
                      <p className="text-sm text-gray-600">{selectedAppointment.type}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Previous Visit</p>
                      <p className="text-sm text-gray-600">{selectedAppointment.previousVisit}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Patient Information Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-3">PATIENT INFORMATION</h4>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedAppointment.patientName}</p>
                    <p className="text-sm text-gray-500">
                      {selectedAppointment.patientAge} years, {selectedAppointment.patientGender}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-600">{selectedAppointment.patientEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-gray-600">{selectedAppointment.patientPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-start col-span-2">
                    <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-gray-600">{selectedAppointment.patientAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Medical Information Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-3">MEDICAL INFORMATION</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Symptoms</p>
                      <p className="text-sm text-gray-600">{selectedAppointment.symptoms}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="w-5 h-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Notes</p>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{selectedAppointment.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between">
            {selectedAppointment && selectedAppointment.status === 'Pending' && (
              <div className="flex space-x-2">
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleDeclineAppointment}
                >
                  Decline
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleOpenRescheduleDialog}
                >
                  Reschedule
                </Button>
                <Button 
                  size="sm"
                  onClick={handleConfirmAppointment}
                >
                  Confirm
                </Button>
              </div>
            )}
            {selectedAppointment && (selectedAppointment.status === 'Confirmed' || selectedAppointment.status === 'Rescheduled') && (
              <div className="flex space-x-2">
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleOpenCancelDialog}
                >
                  Cancel
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleOpenRescheduleDialog}
                >
                  Reschedule
                </Button>
              </div>
            )}
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reschedule Dialog */}
      <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Select a new date and time for this appointment.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedAppointment && (
              <div>
                <p className="text-sm font-medium mb-1">Current Appointment</p>
                <p className="text-sm text-gray-600">
                  {selectedAppointment.date} at {selectedAppointment.time}
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="reschedule-date">New Date</Label>
              <Input
                id="reschedule-date"
                type="date"
                value={rescheduleDate}
                onChange={(e) => setRescheduleDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reschedule-time">New Time</Label>
              <select 
                id="reschedule-time"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={rescheduleTime}
                onChange={(e) => setRescheduleTime(e.target.value)}
                required
              >
                <option value="">Select a time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmReschedule}>Confirm Reschedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cancel Appointment Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedAppointment && (
              <div>
                <p className="text-sm font-medium mb-1">Appointment Details</p>
                <p className="text-sm text-gray-600">
                  Patient: {selectedAppointment.patientName}<br />
                  Date: {selectedAppointment.date} at {selectedAppointment.time}
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="cancel-reason">Reason for Cancellation (Optional)</Label>
              <Input
                id="cancel-reason"
                placeholder="Enter reason for cancellation"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>Go Back</Button>
            <Button variant="destructive" onClick={handleConfirmCancel}>Confirm Cancellation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorAppointments;
