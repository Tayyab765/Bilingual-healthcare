
import React, { useState, useEffect } from 'react';
import { Heart, Star, Briefcase, MessageSquare, Languages, User, Calendar, MapPin, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppointmentBookingForm from './AppointmentBookingForm';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface DoctorCardProps {
  id?: number;
  name: string;
  specialty: string;
  imageUrl?: string;
  delay?: number;
  experience?: number;
  rating?: number;
  appointmentsDone?: number;
  languages?: string[];
  bio?: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ 
  id = Math.floor(Math.random() * 1000),
  name, 
  specialty, 
  imageUrl, 
  delay = 0,
  experience = Math.floor(Math.random() * 15) + 1,
  rating = (Math.random() * 2 + 3).toFixed(1),
  appointmentsDone = Math.floor(Math.random() * 1000) + 100,
  languages = ["English", "Spanish"],
  bio = "Dedicated healthcare professional committed to providing the best care for patients."
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [appointmentType, setAppointmentType] = useState<'physical' | 'online'>('physical');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleMessageDoctor = () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please login or signup to message doctors.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    navigate('/chat', { state: { selectedDoctorId: id, doctorName: name } });
  };

  const handleBookAppointment = () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please login or signup to book appointments.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    setIsBookingOpen(true);
  };

  return (
    <>
      <div 
        className="doctor-card p-4 sm:p-6 text-center bg-white rounded-xl shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer"
        style={{ 
          animation: `slide-up 0.5s ease-out ${delay}s both`
        }}
        onClick={() => setIsDialogOpen(true)}
      >
        <button className="favorite-button absolute top-3 right-3">
          <Heart size={16} className="text-gray-400 hover:text-red-500 transition-colors duration-200" />
        </button>
        
        <div className="doctor-avatar relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mx-auto mb-4 hover:scale-105 transition-transform duration-300">
          <div className="bg-healthcare-light absolute inset-0 animate-pulse-soft"></div>
          <div className="relative z-10 w-full h-full flex items-center justify-center bg-healthcare-light">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[60px] sm:h-[60px]">
                <path d="M30 10C25.9375 10 22.5 13.4375 22.5 17.5C22.5 21.5625 25.9375 25 30 25C34.0625 25 37.5 21.5625 37.5 17.5C37.5 13.4375 34.0625 10 30 10Z" fill="#35C389"/>
                <path d="M30 27.5C22.0875 27.5 15.625 33.9625 15.625 41.875V45C15.625 45.6875 16.1875 46.25 16.875 46.25H43.125C43.8125 46.25 44.375 45.6875 44.375 45V41.875C44.375 33.9625 37.9125 27.5 30 27.5Z" fill="#35C389"/>
              </svg>
            )}
          </div>
        </div>
        
        <h3 className="text-base sm:text-lg font-semibold text-healthcare-text mb-1">{name}</h3>
        <p className="text-xs sm:text-sm text-healthcare-muted">{specialty}</p>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">{name}</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-4">
            <Avatar className="h-24 w-24 mb-4">
              {imageUrl ? (
                <AvatarImage src={imageUrl} alt={name} />
              ) : (
                <AvatarFallback className="bg-healthcare-light text-healthcare-primary">
                  {name.split(' ').map(part => part[0]).join('')}
                </AvatarFallback>
              )}
            </Avatar>
            
            <Badge className="mb-2 bg-healthcare-light text-healthcare-primary hover:bg-healthcare-light">
              {specialty}
            </Badge>
            
            <p className="text-sm text-gray-600 text-center mt-2 mb-6">{bio}</p>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex items-center gap-2 text-sm">
                <Briefcase size={16} className="text-healthcare-primary" />
                <span><strong>{experience}</strong> years experience</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Star size={16} className="text-yellow-500" />
                <span><strong>{rating}</strong> rating</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-healthcare-primary" />
                <span><strong>{appointmentsDone}</strong> appointments</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Languages size={16} className="text-healthcare-primary" />
                <span><strong>Languages:</strong></span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {languages.map((language, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50">
                  {language}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3 mt-6 w-full">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleMessageDoctor}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button 
                className="flex-1 bg-healthcare-primary hover:bg-healthcare-secondary"
                onClick={handleBookAppointment}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Book Appointment with {name}</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="physical" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger 
                value="physical" 
                onClick={() => setAppointmentType('physical')}
                className="flex items-center gap-2"
              >
                <MapPin size={16} />
                Physical Visit
              </TabsTrigger>
              <TabsTrigger 
                value="online" 
                onClick={() => setAppointmentType('online')}
                className="flex items-center gap-2"  
              >
                <Video size={16} />
                Online
              </TabsTrigger>
            </TabsList>
            <TabsContent value="physical">
              <AppointmentBookingForm 
                doctorId={id} 
                doctorName={name} 
                appointmentType="physical" 
                onSuccess={() => {
                  setIsBookingOpen(false);
                  setIsDialogOpen(false);
                }}
              />
            </TabsContent>
            <TabsContent value="online">
              <AppointmentBookingForm 
                doctorId={id} 
                doctorName={name} 
                appointmentType="online" 
                onSuccess={() => {
                  setIsBookingOpen(false);
                  setIsDialogOpen(false);
                }}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoctorCard;
