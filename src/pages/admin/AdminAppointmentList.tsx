
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import AdminSidebar from '@/components/AdminSidebar';
import { Bell, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

const AdminAppointmentList = () => {
  const navigate = useNavigate();
  
  // Example appointments data - in a real app, this would come from an API
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      patientName: "John Doe",
      doctorName: "Dr. Smith",
      department: "Cardiology",
      date: "2025-04-26",
      time: "10:30 AM",
      status: "Confirmed"
    },
    {
      id: "2",
      patientName: "Sarah Johnson",
      doctorName: "Dr. Williams",
      department: "Neurology",
      date: "2025-04-27",
      time: "2:15 PM",
      status: "Pending"
    },
    {
      id: "3",
      patientName: "Michael Brown",
      doctorName: "Dr. Davis",
      department: "Orthopedics",
      date: "2025-04-28",
      time: "9:00 AM",
      status: "Completed"
    },
    {
      id: "4",
      patientName: "Emily Wilson",
      doctorName: "Dr. Taylor",
      department: "Dermatology",
      date: "2025-04-29",
      time: "11:45 AM",
      status: "Cancelled"
    }
  ]);

  const viewAppointmentDetails = (id: string) => {
    navigate(`/admin/appointment-detail/${id}`);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="bg-white shadow-sm z-10 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Appointment List</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">New Doctor Registration</span>
                  <span className="text-sm text-gray-500">Dr. Smith needs verification</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">Appointment Update</span>
                  <span className="text-sm text-gray-500">10 new appointments today</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">System Update</span>
                  <span className="text-sm text-gray-500">New features available</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <main className="flex-1 overflow-y-auto p-6">
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.patientName}</TableCell>
                        <TableCell>{appointment.doctorName}</TableCell>
                        <TableCell>{appointment.department}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            appointment.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 
                            appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => viewAppointmentDetails(appointment.id)}
                          >
                            <Eye className="h-4 w-4" />
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
    </div>
  );
};

export default AdminAppointmentList;
