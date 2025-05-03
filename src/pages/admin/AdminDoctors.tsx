
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
import { Badge } from '@/components/ui/badge';

const AdminDoctors = () => {
  // Example doctors data - in a real app, this would come from an API
  const [doctors, setDoctors] = useState([
    {
      id: "1",
      name: "Dr. John Smith",
      email: "dr.smith@example.com",
      specialty: "Cardiology",
      experience: "12 years",
      phone: "+1 234 567 890",
      status: "Active"
    },
    {
      id: "2",
      name: "Dr. Sarah Williams",
      email: "dr.williams@example.com",
      specialty: "Neurology",
      experience: "8 years",
      phone: "+1 987 654 321",
      status: "Active"
    },
    {
      id: "3",
      name: "Dr. Michael Davis",
      email: "dr.davis@example.com",
      specialty: "Orthopedics",
      experience: "15 years",
      phone: "+1 567 890 123",
      status: "Inactive"
    },
    {
      id: "4",
      name: "Dr. Emily Taylor",
      email: "dr.taylor@example.com",
      specialty: "Dermatology",
      experience: "10 years",
      phone: "+1 678 901 234",
      status: "Active"
    }
  ]);
  
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="bg-white shadow-sm z-10 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Doctors</h1>
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
                      <TableHead>Doctor</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {doctors.map((doctor) => (
                      <TableRow key={doctor.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{doctor.name.charAt(3)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{doctor.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{doctor.email}</TableCell>
                        <TableCell>{doctor.specialty}</TableCell>
                        <TableCell>{doctor.experience}</TableCell>
                        <TableCell>{doctor.phone}</TableCell>
                        <TableCell>
                          <Badge variant={doctor.status === 'Active' ? 'default' : 'secondary'}>
                            {doctor.status}
                          </Badge>
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

export default AdminDoctors;
