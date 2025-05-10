import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle2, User, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for appointments (completed and cancelled)
const mockPastAppointments = [
  {
    id: 3,
    doctor: "Dr. Emily Rodriguez",
    specialty: "Neurologist",
    date: "2023-09-10",
    time: "11:00 AM",
    status: "Completed",
    notes: "Headache consultation",
  },
  {
    id: 4,
    doctor: "Dr. David Kim",
    specialty: "Orthopedic Surgeon",
    date: "2023-09-05",
    time: "03:45 PM",
    status: "Cancelled",
    notes: "Knee pain evaluation",
  }
];

// Mock data for expired prescriptions
const mockExpiredPrescriptions = [
  {
    id: 3,
    name: "Ibuprofen",
    doctor: "Dr. Michael Chen",
    issuedDate: "2023-09-05",
    expiryDate: "2023-09-20",
    dosage: "400mg",
    frequency: "As needed",
    refillsLeft: 0,
    status: "Expired",
    instructions: "Take for pain, do not exceed 3 tablets per day"
  }
];

const History = () => {
  const [pastAppointments, setPastAppointments] = useState(mockPastAppointments);
  const [expiredPrescriptions, setExpiredPrescriptions] = useState(mockExpiredPrescriptions);
  const [activeTab, setActiveTab] = useState("appointments");
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">History</h1>
            <p className="text-gray-500">View your past appointments and expired prescriptions</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="appointments">Past Appointments</TabsTrigger>
              <TabsTrigger value="prescriptions">Expired Prescriptions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appointments" className="mt-4">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {isMobile ? (
                  <div className="divide-y divide-gray-200">
                    {pastAppointments.map(appointment => (
                      <div key={appointment.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{appointment.doctor}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status}
                          </span>
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
                        <div className="mt-2 text-sm">
                          <p><span className="font-medium">Notes:</span> {appointment.notes}</p>
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
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastAppointments.map(appointment => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">{appointment.doctor}</TableCell>
                          <TableCell>{appointment.specialty}</TableCell>
                          <TableCell>{appointment.date}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {appointment.status}
                            </span>
                          </TableCell>
                          <TableCell>{appointment.notes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="prescriptions" className="mt-4">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {isMobile ? (
                  <div className="divide-y divide-gray-200">
                    {expiredPrescriptions.map(prescription => (
                      <div key={prescription.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{prescription.name}</h3>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {prescription.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">Prescribed by {prescription.doctor}</p>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Dosage:</p>
                            <p className="font-medium">{prescription.dosage}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Frequency:</p>
                            <p className="font-medium">{prescription.frequency}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Issued:</p>
                            <p className="font-medium">{prescription.issuedDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Expired:</p>
                            <p className="font-medium">{prescription.expiryDate}</p>
                          </div>
                        </div>
                        <div className="mt-3 space-y-2">
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Instructions:</span> {prescription.instructions}
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Refills left:</span> {prescription.refillsLeft}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medication</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Issued</TableHead>
                        <TableHead>Expired</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Refills</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expiredPrescriptions.map(prescription => (
                        <TableRow key={prescription.id}>
                          <TableCell className="font-medium">{prescription.name}</TableCell>
                          <TableCell>{prescription.doctor}</TableCell>
                          <TableCell>{prescription.dosage}, {prescription.frequency}</TableCell>
                          <TableCell>{prescription.issuedDate}</TableCell>
                          <TableCell>{prescription.expiryDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                {prescription.status}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{prescription.refillsLeft}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default History;
