
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AdminPatients = () => {
  // Example patients data - in a real app, this would come from an API
  const [patients, setPatients] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 890",
      dob: "1985-05-15",
      gender: "Male",
      address: "123 Main St, New York, NY"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 987 654 321",
      dob: "1992-11-23",
      gender: "Female",
      address: "456 Oak Ave, Chicago, IL"
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "m.brown@example.com",
      phone: "+1 567 890 123",
      dob: "1978-03-30",
      gender: "Male",
      address: "789 Pine St, San Francisco, CA"
    },
    {
      id: "4",
      name: "Emily Wilson",
      email: "emily.w@example.com",
      phone: "+1 678 901 234",
      dob: "1990-07-12",
      gender: "Female",
      address: "321 Cedar Rd, Austin, TX"
    }
  ]);
  
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="bg-white shadow-sm z-10 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Patients</h1>
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
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Date of Birth</TableHead>
                      <TableHead>Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{patient.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{patient.email}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.dob}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{patient.address}</TableCell>
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

export default AdminPatients;
