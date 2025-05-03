
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import AdminSidebar from '@/components/AdminSidebar';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminAppointmentDetail = () => {
  const { id } = useParams();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="bg-white shadow-sm z-10 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Appointment Detail</h1>
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
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Appointment Information</h2>
                <p className="text-gray-500">
                  {id ? `Details for appointment ${id}` : 'No appointment selected'}
                </p>
                
                {/* Placeholder for appointment details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h3 className="font-medium">Patient Information</h3>
                    <p className="text-gray-600">Name: John Doe</p>
                    <p className="text-gray-600">Age: 45</p>
                    <p className="text-gray-600">Contact: +1 234 567 890</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Doctor Information</h3>
                    <p className="text-gray-600">Name: Dr. Jane Smith</p>
                    <p className="text-gray-600">Specialty: Cardiology</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Appointment Details</h3>
                    <p className="text-gray-600">Date: April 25, 2025</p>
                    <p className="text-gray-600">Time: 10:30 AM</p>
                    <p className="text-gray-600">Status: <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Confirmed</span></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminAppointmentDetail;
