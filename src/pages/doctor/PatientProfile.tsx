import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, Mail, User, ArrowLeft, Clock, FileText, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const getPatientData = (id: string) => {
  const patients = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "May 12, 1985",
      lastVisit: "Apr 10, 2025",
      appointments: 5,
      address: "123 Main St, San Francisco, CA",
      bloodType: "O+",
      allergies: ["Penicillin", "Peanuts"],
      medicalHistory: [
        { date: "Jan 15, 2025", diagnosis: "Common Cold", treatment: "Prescribed rest and fluids" },
        { date: "Oct 05, 2024", diagnosis: "Sprained Ankle", treatment: "Prescribed rest, ice, compression, and elevation" }
      ],
      upcomingAppointments: [
        { date: "Apr 25, 2025", time: "10:00 AM", reason: "Follow-up" }
      ],
      prescriptions: [
        { name: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", duration: "7 days", date: "Apr 10, 2025" }
      ]
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      dateOfBirth: "Sep 28, 1990",
      lastVisit: "Apr 05, 2025",
      appointments: 3,
      address: "456 Oak Ave, San Francisco, CA",
      bloodType: "A-",
      allergies: ["Sulfa drugs"],
      medicalHistory: [
        { date: "Apr 05, 2025", diagnosis: "Seasonal Allergies", treatment: "Prescribed antihistamines" },
        { date: "Feb 10, 2025", diagnosis: "Influenza", treatment: "Prescribed antiviral medication and rest" }
      ],
      upcomingAppointments: [
        { date: "May 15, 2025", time: "2:30 PM", reason: "Annual Check-up" }
      ],
      prescriptions: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days", date: "Apr 05, 2025" }
      ]
    },
    {
      id: "3",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      phone: "+1 (555) 246-8101",
      dateOfBirth: "Nov 15, 1976",
      lastVisit: "Mar 22, 2025",
      appointments: 8,
      address: "789 Pine St, San Francisco, CA",
      bloodType: "B+",
      allergies: ["Latex", "Shellfish"],
      medicalHistory: [
        { date: "Mar 22, 2025", diagnosis: "Hypertension", treatment: "Prescribed medication and lifestyle changes" },
        { date: "Jan 08, 2025", diagnosis: "Lower Back Pain", treatment: "Prescribed physical therapy and pain management" }
      ],
      upcomingAppointments: [
        { date: "Apr 30, 2025", time: "11:15 AM", reason: "Blood Pressure Check" }
      ],
      prescriptions: [
        { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", duration: "90 days", date: "Mar 22, 2025" }
      ]
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 369-7452",
      dateOfBirth: "Feb 3, 1992",
      lastVisit: "Apr 12, 2025",
      appointments: 2,
      address: "101 Elm St, San Francisco, CA",
      bloodType: "AB+",
      allergies: [],
      medicalHistory: [
        { date: "Apr 12, 2025", diagnosis: "Migraine", treatment: "Prescribed medication and triggers avoidance" }
      ],
      upcomingAppointments: [
        { date: "May 20, 2025", time: "9:00 AM", reason: "Follow-up" }
      ],
      prescriptions: [
        { name: "Sumatriptan", dosage: "50mg", frequency: "As needed", duration: "PRN", date: "Apr 12, 2025" }
      ]
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "robert.wilson@example.com",
      phone: "+1 (555) 741-9632",
      dateOfBirth: "Jul 19, 1983",
      lastVisit: "Mar 18, 2025",
      appointments: 4,
      address: "222 Cedar Rd, San Francisco, CA",
      bloodType: "A+",
      allergies: ["Ibuprofen"],
      medicalHistory: [
        { date: "Mar 18, 2025", diagnosis: "Gastritis", treatment: "Prescribed proton-pump inhibitors and diet modifications" },
        { date: "Dec 05, 2024", diagnosis: "Bronchitis", treatment: "Prescribed antibiotics and cough suppressants" }
      ],
      upcomingAppointments: [
        { date: "Apr 28, 2025", time: "1:45 PM", reason: "Check-up" }
      ],
      prescriptions: [
        { name: "Omeprazole", dosage: "20mg", frequency: "Once daily", duration: "30 days", date: "Mar 18, 2025" }
      ]
    }
  ];
  
  return patients.find(patient => patient.id === id);
};

const PatientProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<any>(null);
  
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
      return;
    }
    
    if (id) {
      const patientData = getPatientData(id);
      if (patientData) {
        setPatient(patientData);
      } else {
        toast({
          title: "Patient not found",
          description: "The requested patient profile could not be found.",
          variant: "destructive",
        });
        navigate('/doctor/patients');
      }
    }
  }, [id, navigate, toast]);

  const handleBackClick = () => {
    navigate('/doctor/patients');
  };

  if (!patient) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-4 md:p-6 lg:ml-64">
            <div className="flex items-center space-x-2 mb-6">
              <Button variant="ghost" size="sm" onClick={handleBackClick}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Patients
              </Button>
            </div>
            <div className="text-center py-10">
              <p>Loading patient profile...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-4 md:p-6 lg:ml-64">
          <div className="flex items-center space-x-2 mb-6">
            <Button variant="ghost" size="sm" onClick={handleBackClick}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patients
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Patient Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-start space-x-4">
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{patient.name}</h2>
                      <div className="flex items-center text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{patient.dateOfBirth} ({new Date().getFullYear() - new Date(patient.dateOfBirth.split(', ')[1] || patient.dateOfBirth.split(' ')[2]).getFullYear()} years)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <User className="h-4 w-4 mr-2" />
                    <span>Blood Type: {patient.bloodType}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-blue-700 font-medium">Last Visit</div>
                    <Clock className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="mt-2 text-lg font-semibold">{patient.lastVisit}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-green-700 font-medium">Total Appointments</div>
                    <Calendar className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="mt-2 text-lg font-semibold">{patient.appointments}</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-purple-700 font-medium">Active Prescriptions</div>
                    <FileText className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="mt-2 text-lg font-semibold">{patient.prescriptions.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-red-500" />
                  Allergies
                </CardTitle>
              </CardHeader>
              <CardContent>
                {patient.allergies.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {patient.allergies.map((allergy: string, index: number) => (
                      <li key={index} className="text-red-600">{allergy}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No known allergies</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-blue-500" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {patient.upcomingAppointments.length > 0 ? (
                  <ul className="space-y-3">
                    {patient.upcomingAppointments.map((appointment: any, index: number) => (
                      <li key={index} className="bg-blue-50 p-3 rounded-md">
                        <div className="font-medium">{appointment.date}, {appointment.time}</div>
                        <div className="text-sm text-gray-600">Reason: {appointment.reason}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No upcoming appointments</p>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Treatment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patient.medicalHistory.map((history: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{history.date}</TableCell>
                      <TableCell>{history.diagnosis}</TableCell>
                      <TableCell>{history.treatment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Current Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              {patient.prescriptions.length > 0 ? (
                <div className="space-y-4">
                  {patient.prescriptions.map((prescription: any, index: number) => (
                    <div key={index} className="bg-white border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{prescription.name}</h3>
                          <p className="text-sm text-gray-500">Prescribed on {prescription.date}</p>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="font-medium">Dosage:</span> {prescription.dosage}
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="font-medium">Frequency:</span> {prescription.frequency}
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="font-medium">Duration:</span> {prescription.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No active prescriptions</p>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default PatientProfile;
