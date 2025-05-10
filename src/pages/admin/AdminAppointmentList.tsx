import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, Clock, Stethoscope, User } from 'lucide-react';

const AdminAppointmentList = () => {
  // Example appointments data
  const appointments = [
    {
      id: 1,
      patientName: "Hamza",
      patientEmail: "hamza@example.com",
      patientPhone: "+1 234 567 890",
      patientDob: "1992-05-15",
      patientGender: "Male",
      patientAddress: "123 Main St, New York, NY",
      doctorName: "Dr. Ali",
      checkup: "Fever",
      date: "01-02-2025",
      time: "02:30 PM",
      status: "Completed",
      notes: "Patient complained of high fever and headache. Prescribed antibiotics and rest."
    },
    // ...other appointments
  ];

  // State for selected appointment and dialog
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Function to handle viewing patient profile
  const handleViewProfile = (appointment) => {
    setSelectedAppointment(appointment);
    setIsProfileOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden pl-64">
        <div className="bg-white shadow-sm z-10 p-4">
          <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
        </div>
        
        <main className="flex-1 overflow-y-auto p-6">
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Doctor Name</TableHead>
                      <TableHead>Checkup Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.patientName}</TableCell>
                        <TableCell>{appointment.doctorName}</TableCell>
                        <TableCell>{appointment.checkup}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'Pending' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => handleViewProfile(appointment)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      
      {/* Patient Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Patient Profile</DialogTitle>
            <DialogDescription>
              Detailed information about the patient.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="mt-4 space-y-4">
              <div className="flex flex-col items-center mb-4">
                <Avatar className="h-20 w-20 mb-2">
                  <AvatarFallback className="text-xl">{selectedAppointment.patientName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{selectedAppointment.patientName}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedAppointment.patientEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedAppointment.patientPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{selectedAppointment.patientGender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{selectedAppointment.patientDob}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{selectedAppointment.patientAddress}</p>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">Medical History</h4>
                <p className="text-sm text-gray-500">No medical history records found for this patient.</p>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Recent Appointments</h4>
                <p className="text-sm text-gray-500">No recent appointments found for this patient.</p>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button variant="outline" onClick={() => setIsProfileOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAppointmentList;
