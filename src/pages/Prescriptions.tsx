import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const Prescriptions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDoctor, setIsDoctor] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const doctorLoggedIn = localStorage.getItem('isDoctor') === 'true';
    
    if (!isLoggedIn) {
      toast({
        title: "Access denied",
        description: "Please login to access prescriptions.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    setIsDoctor(doctorLoggedIn);
  }, [navigate, toast]);

  // Example prescriptions data
  const prescriptions = [
    {
      id: 1,
      date: "2025-04-15",
      doctor: "Dr. Sarah Johnson",
      patient: "John Doe",
      medications: [
        { name: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", duration: "7 days" }
      ],
      status: "Active"
    },
    {
      id: 2,
      date: "2025-04-10",
      doctor: "Dr. Michael Chen",
      patient: "Jane Smith",
      medications: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days" }
      ],
      status: "Active"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              {isDoctor ? "Patient Prescriptions" : "My Prescriptions"}
            </h1>
            
            <div className="grid gap-6">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {isDoctor ? `Patient: ${prescription.patient}` : `Dr. ${prescription.doctor}`}
                        </h3>
                        <p className="text-sm text-gray-500">Date: {prescription.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        prescription.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {prescription.status}
                      </span>
                    </div>
                    
                    {prescription.medications.map((medication, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 mt-4">
                        <h4 className="font-medium text-gray-900">{medication.name}</h4>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                          <p>Dosage: {medication.dosage}</p>
                          <p>Frequency: {medication.frequency}</p>
                          <p>Duration: {medication.duration}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Prescriptions;
