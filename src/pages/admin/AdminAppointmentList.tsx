import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, Clock, Stethoscope, User, PieChart, Search, Activity, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

const AdminAppointmentList = () => {
  // Example appointments data with more detailed diagnosis information
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
      diagnosis: "Common Cold",
      date: "01-02-2025",
      time: "02:30 PM",
      status: "Completed",
      notes: "Patient complained of high fever and headache. Prescribed antibiotics and rest."
    },
    {
      id: 2,
      patientName: "Sarah",
      patientEmail: "sarah@example.com",
      patientPhone: "+1 987 654 321",
      patientDob: "1988-11-23",
      patientGender: "Female",
      patientAddress: "456 Oak Ave, Boston, MA",
      doctorName: "Dr. Ahmad",
      checkup: "Annual Physical",
      diagnosis: "Hypertension",
      date: "05-02-2025",
      time: "10:00 AM",
      status: "Completed",
      notes: "Blood pressure elevated. Recommended diet changes and prescribed medication."
    },
    {
      id: 3,
      patientName: "John",
      patientEmail: "john@example.com",
      patientPhone: "+1 555 123 4567",
      patientDob: "1975-08-12",
      patientGender: "Male",
      patientAddress: "789 Pine St, Chicago, IL",
      doctorName: "Dr. Ali",
      checkup: "Respiratory Issues",
      diagnosis: "Asthma",
      date: "10-02-2025",
      time: "1:15 PM",
      status: "Pending",
      notes: ""
    },
    {
      id: 4,
      patientName: "Emily",
      patientEmail: "emily@example.com",
      patientPhone: "+1 444 555 6666",
      patientDob: "1995-03-28",
      patientGender: "Female",
      patientAddress: "101 Maple Dr, Seattle, WA",
      doctorName: "Dr. Junaid",
      checkup: "Skin Rash",
      diagnosis: "Eczema",
      date: "12-02-2025",
      time: "11:30 AM",
      status: "Completed",
      notes: "Prescribed topical corticosteroids and moisturizers. Follow-up in 2 weeks."
    },
    {
      id: 5,
      patientName: "Michael",
      patientEmail: "michael@example.com",
      patientPhone: "+1 777 888 9999",
      patientDob: "1980-12-05",
      patientGender: "Male",
      patientAddress: "222 Elm St, Miami, FL",
      doctorName: "Dr. Ahmad",
      checkup: "Joint Pain",
      diagnosis: "Arthritis",
      date: "15-02-2025",
      time: "3:45 PM",
      status: "Completed",
      notes: "Recommended physical therapy and anti-inflammatory medication."
    },
    {
      id: 6,
      patientName: "Jessica",
      patientEmail: "jessica@example.com",
      patientPhone: "+1 222 333 4444",
      patientDob: "1990-07-17",
      patientGender: "Female",
      patientAddress: "333 Cedar Ave, Denver, CO",
      doctorName: "Dr. Ali",
      checkup: "Fever",
      diagnosis: "Influenza",
      date: "18-02-2025",
      time: "9:15 AM",
      status: "Completed",
      notes: "Prescribed antiviral medication, rest, and fluids."
    },
    {
      id: 7,
      patientName: "David",
      patientEmail: "david@example.com",
      patientPhone: "+1 111 222 3333",
      patientDob: "1965-01-30",
      patientGender: "Male",
      patientAddress: "444 Birch Rd, Austin, TX",
      doctorName: "Dr. Junaid",
      checkup: "Chest Pain",
      diagnosis: "Hypertension",
      date: "20-02-2025",
      time: "2:00 PM",
      status: "Pending",
      notes: ""
    },
    {
      id: 8,
      patientName: "Lisa",
      patientEmail: "lisa@example.com",
      patientPhone: "+1 555 666 7777",
      patientDob: "1982-09-14",
      patientGender: "Female",
      patientAddress: "555 Willow St, Portland, OR",
      doctorName: "Dr. Ahmad",
      checkup: "Fatigue",
      diagnosis: "Anemia",
      date: "22-02-2025",
      time: "10:45 AM",
      status: "Completed",
      notes: "Prescribed iron supplements and diet changes."
    },
    {
      id: 9,
      patientName: "Robert",
      patientEmail: "robert@example.com",
      patientPhone: "+1 999 888 7777",
      patientDob: "1972-06-22",
      patientGender: "Male",
      patientAddress: "666 Spruce Ave, San Francisco, CA",
      doctorName: "Dr. Ali",
      checkup: "Respiratory Issues",
      diagnosis: "Asthma",
      date: "25-02-2025",
      time: "1:30 PM",
      status: "Completed",
      notes: "Prescribed inhaler and discussed trigger management."
    },
    {
      id: 10,
      patientName: "Karen",
      patientEmail: "karen@example.com",
      patientPhone: "+1 777 666 5555",
      patientDob: "1978-04-09",
      patientGender: "Female",
      patientAddress: "777 Ash St, Phoenix, AZ",
      doctorName: "Dr. Junaid",
      checkup: "Headache",
      diagnosis: "Migraine",
      date: "28-02-2025",
      time: "4:00 PM",
      status: "Pending",
      notes: ""
    }
  ];

  // State for selected appointment and dialog
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // State for disease search and statistics
  const [diseaseSearch, setDiseaseSearch] = useState('');
  const [filteredDiagnoses, setFilteredDiagnoses] = useState([]);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);
  
  // State for filtering appointments
  const [viewMode, setViewMode] = useState('all');
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);
  const [appointmentSearch, setAppointmentSearch] = useState('');

  // Function to handle viewing patient profile
  const handleViewProfile = (appointment) => {
    setSelectedAppointment(appointment);
    setIsProfileOpen(true);
  };

  // Process the appointments data to extract disease statistics
  type DiseaseStats = {
    count: number;
    patients: Set<string>;
    appointments: typeof appointments;
  };
  const getDiseaseStatistics = () => {
    const statistics: Record<string, DiseaseStats> = {};
    
    appointments.forEach(appointment => {
      const diagnosis = appointment.diagnosis;
      if (diagnosis) {
        if (!statistics[diagnosis]) {
          statistics[diagnosis] = {
            count: 0,
            patients: new Set(),
            appointments: []
          };
        }
        statistics[diagnosis].count += 1;
        statistics[diagnosis].patients.add(appointment.patientName);
        statistics[diagnosis].appointments.push(appointment);
      }
    });
    
    // Convert to array for easier rendering
    return Object.entries(statistics).map(([name, data]) => ({
      name,
      count: data.count,
      patientCount: data.patients.size,
      appointments: data.appointments
    }));
  };

  // Get the full list of disease statistics
  const diseaseStatistics = getDiseaseStatistics();
  
  // Filter disease statistics based on search
  useEffect(() => {
    if (diseaseSearch.trim() === '') {
      setFilteredDiagnoses(diseaseStatistics);
    } else {
      const searchTerm = diseaseSearch.toLowerCase();
      const filtered = diseaseStatistics.filter(disease => 
        disease.name.toLowerCase().includes(searchTerm)
      );
      setFilteredDiagnoses(filtered);
    }
  }, [diseaseSearch, diseaseStatistics]);
  
  // Initialize filtered diagnoses when component mounts
  useEffect(() => {
    setFilteredDiagnoses(diseaseStatistics);
  }, [diseaseStatistics]);

  // Handle clicking on a disease to view details
  const handleViewDiseaseDetails = (disease) => {
    setSelectedDisease(disease);
    setIsStatisticsOpen(true);
  };
  
  // Handle filtering appointments by view mode and search
  useEffect(() => {
    let result = [...appointments];
    
    // Filter by status
    if (viewMode !== 'all') {
      result = result.filter(appointment => 
        appointment.status.toLowerCase() === viewMode.toLowerCase()
      );
    }
    
    // Filter by search term
    if (appointmentSearch.trim() !== '') {
      const searchTerm = appointmentSearch.toLowerCase();
      result = result.filter(appointment => 
        appointment.patientName.toLowerCase().includes(searchTerm) ||
        appointment.doctorName.toLowerCase().includes(searchTerm) ||
        appointment.checkup.toLowerCase().includes(searchTerm) ||
        (appointment.diagnosis && appointment.diagnosis.toLowerCase().includes(searchTerm))
      );
    }
    
    setFilteredAppointments(result);
  }, [viewMode, appointmentSearch, appointments]);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden pl-64">
        <div className="bg-white shadow-sm z-10 p-4">
          <h1 className="text-2xl font-semibold text-gray-800">Appointments Management</h1>
        </div>
        
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="grid grid-cols-2 w-[400px] mb-6">
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="diseases">Disease Statistics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appointments" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant={viewMode === 'all' ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setViewMode('all')}
                      >
                        All
                      </Button>
                      <Button 
                        variant={viewMode === 'completed' ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setViewMode('completed')}
                        className={viewMode === 'completed' ? "bg-green-500 hover:bg-green-600 text-white" : "bg-green-100 hover:bg-green-200 text-green-800 border-green-200"}
                      >
                        Completed
                      </Button>
                      <Button 
                        variant={viewMode === 'pending' ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setViewMode('pending')}
                        className={viewMode === 'pending' ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200"}
                      >
                        Pending
                      </Button>
                    </div>
                    
                    <div className="relative w-full max-w-xs">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search appointments..."
                        className="pl-8"
                        value={appointmentSearch}
                        onChange={(e) => setAppointmentSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient Name</TableHead>
                          <TableHead>Doctor Name</TableHead>
                          <TableHead>Checkup Type</TableHead>
                          <TableHead>Diagnosis</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAppointments.length > 0 ? (
                          filteredAppointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                              <TableCell>{appointment.patientName}</TableCell>
                              <TableCell>{appointment.doctorName}</TableCell>
                              <TableCell>{appointment.checkup}</TableCell>
                              <TableCell>
                                {appointment.diagnosis || "Pending diagnosis"}
                              </TableCell>
                              <TableCell>{appointment.date}</TableCell>
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
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                              No appointments found matching your filters
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Results count */}
                  <div className="mt-4 text-sm text-gray-500">
                    Showing {filteredAppointments.length} of {appointments.length} appointments
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="diseases" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <h2 className="text-xl font-semibold">Disease Statistics</h2>
                    
                    <div className="relative w-full max-w-xs">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search diseases..."
                        value={diseaseSearch}
                        onChange={(e) => setDiseaseSearch(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-blue-50 border-blue-100">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600">Total Diagnoses</p>
                          <p className="text-3xl font-bold">
                            {appointments.filter(a => a.diagnosis).length}
                          </p>
                        </div>
                        <Activity className="h-10 w-10 text-blue-500" />
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-green-50 border-green-100">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600">Unique Diseases</p>
                          <p className="text-3xl font-bold">{diseaseStatistics.length}</p>
                        </div>
                        <PieChart className="h-10 w-10 text-green-500" />
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-purple-50 border-purple-100">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600">Most Common</p>
                          <p className="text-xl font-bold truncate max-w-[150px]">
                            {diseaseStatistics.length > 0 ? 
                              [...diseaseStatistics].sort((a, b) => b.count - a.count)[0]?.name : 
                              "N/A"}
                          </p>
                        </div>
                        <div className="bg-purple-200 text-purple-700 rounded-full px-2 py-1 text-sm font-medium">
                          {diseaseStatistics.length > 0 ? 
                            [...diseaseStatistics].sort((a, b) => b.count - a.count)[0]?.count : 
                            0} cases
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {filteredDiagnoses.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Disease/Condition</TableHead>
                          <TableHead>Total Cases</TableHead>
                          <TableHead>Unique Patients</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDiagnoses.map((disease, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{disease.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-50">
                                {disease.count} cases
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-50">
                                {disease.patientCount} patients
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => handleViewDiseaseDetails(disease)}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10">
                      <PieChart className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No diseases found</h3>
                      <p className="text-gray-500">
                        No diseases match your search query.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
                <h4 className="font-medium mb-2">Current Appointment</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Doctor</p>
                    <p className="font-medium">{selectedAppointment.doctorName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">{selectedAppointment.date}, {selectedAppointment.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Checkup Type</p>
                    <p className="font-medium">{selectedAppointment.checkup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Diagnosis</p>
                    <p className="font-medium">{selectedAppointment.diagnosis || "Pending"}</p>
                  </div>
                  {selectedAppointment.notes && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Notes</p>
                      <p className="font-medium">{selectedAppointment.notes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Medical History</h4>
                <p className="text-sm text-gray-500">No previous medical history records found.</p>
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
      
      {/* Disease Statistics Detail Dialog */}
      <Dialog open={isStatisticsOpen} onOpenChange={setIsStatisticsOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-500" />
              {selectedDisease?.name} Statistics
            </DialogTitle>
            <DialogDescription>
              Detailed information about {selectedDisease?.name} cases in your healthcare system.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDisease && (
            <div className="mt-4 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-100">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-blue-700">Total Cases</h3>
                    <p className="text-3xl font-bold">{selectedDisease.count}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 border-green-100">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-green-700">Unique Patients</h3>
                    <p className="text-3xl font-bold">{selectedDisease.patientCount}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50 border-purple-100">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-purple-700">Case Rate</h3>
                    <p className="text-3xl font-bold">
                      {((selectedDisease.count / appointments.length) * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-purple-600">of total appointments</p>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Patient Cases</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedDisease.appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.patientName}</TableCell>
                        <TableCell>{appointment.doctorName}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'Pending' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button variant="outline" onClick={() => setIsStatisticsOpen(false)}>
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
