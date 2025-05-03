
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock appointments data (in a real app, this would come from an API or localStorage)
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

  // Filter appointments for the selected date
  const filteredAppointments = date 
    ? appointments.filter((appt: any) => {
        const apptDate = new Date(appt.date);
        return apptDate.toDateString() === date.toDateString();
      })
    : [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        <Header />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Calendar</h1>
            <p className="text-gray-500">View and manage your schedule</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border pointer-events-auto"
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {filteredAppointments.map((appt: any) => (
                        <div key={appt.id} className="flex flex-col p-4 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg">{appt.doctor}</h3>
                              <p className="text-sm text-gray-500">{appt.specialty}</p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              {appt.status}
                            </Badge>
                          </div>
                          
                          <div className="mt-3 flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {appt.time}
                          </div>
                          
                          {appt.notes && (
                            <p className="mt-2 text-sm text-gray-600">
                              {appt.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No Appointments</h3>
                      <p className="text-gray-500">
                        {date 
                          ? `You don't have any appointments scheduled for ${format(date, 'MMMM d, yyyy')}.`
                          : 'Select a date to view appointments.'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalendarPage;
