import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Plus, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Sidebar from '@/components/Sidebar';

// Define the days of the week
const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

// Define time slots in 30-minute increments
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 20; hour++) {
    for (let minute of ['00', '30']) {
      const time = `${hour.toString().padStart(2, '0')}:${minute}`;
      slots.push(time);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Sample initial availability data
const initialAvailability = [
  { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  { id: 2, day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  { id: 4, day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
  { id: 5, day: 'Friday', startTime: '09:00', endTime: '14:00', isAvailable: true },
  { id: 6, day: 'Saturday', startTime: '10:00', endTime: '13:00', isAvailable: true },
  { id: 7, day: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false },
];

// Sample booked appointments that restrict editing availability
const bookedAppointments = [
  { day: 'Monday', time: '10:00' },
  { day: 'Tuesday', time: '14:30' },
  { day: 'Wednesday', time: '11:00' },
];

const DoctorAvailability = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [availability, setAvailability] = useState(initialAvailability);
  
  useEffect(() => {
    // Check if logged in as doctor
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

  const handleToggleAvailability = (id) => {
    setAvailability(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const handleTimeChange = (id, field, value) => {
    // Check if the time slot has booked appointments
    const slot = availability.find(item => item.id === id);
    const hasBookedAppointment = bookedAppointments.some(
      appointment => appointment.day === slot.day && 
      (field === 'startTime' ? appointment.time >= slot.startTime && appointment.time < value : 
                               appointment.time > value && appointment.time <= slot.endTime)
    );

    if (hasBookedAppointment) {
      toast({
        title: "Cannot modify this time slot",
        description: "There are booked appointments during this time.",
        variant: "destructive",
      });
      return;
    }

    setAvailability(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addNewTimeSlot = (day) => {
    const newId = availability.length + 1;
    setAvailability([
      ...availability,
      { id: newId, day, startTime: '09:00', endTime: '17:00', isAvailable: true }
    ]);
  };

  const removeTimeSlot = (id) => {
    const slotToRemove = availability.find(item => item.id === id);
    
    // Check if any appointments are booked during this slot
    const hasBookedAppointment = bookedAppointments.some(
      appointment => appointment.day === slotToRemove.day && 
      appointment.time >= slotToRemove.startTime && 
      appointment.time <= slotToRemove.endTime
    );

    if (hasBookedAppointment) {
      toast({
        title: "Cannot remove this time slot",
        description: "There are booked appointments during this time.",
        variant: "destructive",
      });
      return;
    }

    setAvailability(prev => prev.filter(item => item.id !== id));
  };

  const saveAvailability = () => {
    // Here you would typically send the data to your backend API
    toast({
      title: "Availability updated",
      description: "Your availability settings have been saved successfully.",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-semibold text-gray-800">Availability</h1>
              <Button onClick={saveAvailability}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Your Availability</CardTitle>
              <CardDescription>
                Set your available hours for patient appointments. You cannot edit time slots where appointments are already booked.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {daysOfWeek.map(day => (
                  <div key={day} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">{day}</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => addNewTimeSlot(day)}
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Time Slot
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {availability
                        .filter(slot => slot.day === day)
                        .map(slot => (
                          <div key={slot.id} className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Button
                                variant={slot.isAvailable ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleToggleAvailability(slot.id)}
                                className={slot.isAvailable ? "bg-green-500 hover:bg-green-600" : ""}
                              >
                                {slot.isAvailable ? "Available" : "Unavailable"}
                              </Button>
                            </div>
                            
                            {slot.isAvailable && (
                              <>
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4 text-gray-400" />
                                  <Select
                                    value={slot.startTime}
                                    onValueChange={(value) => handleTimeChange(slot.id, 'startTime', value)}
                                    disabled={!slot.isAvailable}
                                  >
                                    <SelectTrigger className="w-[120px]">
                                      <SelectValue placeholder="Start time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map(time => (
                                        <SelectItem key={`start-${time}`} value={time}>
                                          {time}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <span>to</span>
                                
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4 text-gray-400" />
                                  <Select
                                    value={slot.endTime}
                                    onValueChange={(value) => handleTimeChange(slot.id, 'endTime', value)}
                                    disabled={!slot.isAvailable}
                                  >
                                    <SelectTrigger className="w-[120px]">
                                      <SelectValue placeholder="End time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map(time => (
                                        <SelectItem key={`end-${time}`} value={time}>
                                          {time}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTimeSlot(slot.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        
                        {!availability.some(slot => slot.day === day) && (
                          <div className="text-gray-500 text-sm">No time slots set for {day}.</div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DoctorAvailability;
