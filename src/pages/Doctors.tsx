
import React, { useEffect, useState } from 'react';
import { Star, MessageSquare, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import DoctorCard from '@/components/DoctorCard';

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 124,
    languages: ["English", "Spanish"],
    lastVisit: "15 Aug 2023",
    upcoming: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 98,
    languages: ["English", "Mandarin"],
    lastVisit: "28 Jul 2023",
    upcoming: false,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Neurologist",
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 156,
    languages: ["English", "Spanish", "Portuguese"],
    lastVisit: "10 Sep 2023",
    upcoming: true,
  },
  {
    id: 4,
    name: "Dr. David Kim",
    specialty: "Orthopedic Surgeon",
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 87,
    languages: ["English", "Korean"],
    lastVisit: "05 Jun 2023",
    upcoming: false,
  },
  {
    id: 5,
    name: "Dr. Lisa Taylor",
    specialty: "Psychiatrist",
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 132,
    languages: ["English", "French"],
    lastVisit: "22 Aug 2023",
    upcoming: false,
  }
];

const Doctors = () => {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = '/login';
    }
    
    // Extract search query from URL if present
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);
  
  // Filter doctors based on upcoming appointments and search query
  const filteredDoctors = doctors
    .filter(doc => filter === 'all' || (filter === 'upcoming' && doc.upcoming))
    .filter(doc => 
      !searchQuery || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleFindNewDoctor = () => {
    // In a real app, this would navigate to a search page or open a search modal
    // For demo purposes, we'll just show the "all" filter
    setFilter('all');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        <Header />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">My Doctors</h1>
            <p className="text-gray-500">View and manage your healthcare providers</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex space-x-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'bg-healthcare-primary text-white' : ''}
              >
                All Doctors
              </Button>
              <Button 
                variant={filter === 'upcoming' ? 'default' : 'outline'} 
                onClick={() => setFilter('upcoming')}
                className={filter === 'upcoming' ? 'bg-healthcare-primary text-white' : ''}
              >
                Upcoming Appointments
              </Button>
            </div>
            
            <Button 
              className="bg-healthcare-primary hover:bg-healthcare-secondary"
              onClick={handleFindNewDoctor}
            >
              Find New Doctor
            </Button>
          </div>
          
          {searchQuery && (
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Showing results for: <span className="font-medium">{searchQuery}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2" 
                  onClick={() => {
                    setSearchQuery('');
                    navigate('/doctors');
                  }}
                >
                  Clear search
                </Button>
              </p>
            </div>
          )}
          
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No doctors found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setFilter('all');
                }}
              >
                View all doctors
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map(doctor => (
                <DoctorCard 
                  key={doctor.id}
                  id={doctor.id}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  imageUrl={doctor.image}
                  rating={doctor.rating}
                  languages={doctor.languages}
                  experience={Math.floor(Math.random() * 15) + 5}
                  appointmentsDone={doctor.reviews * 10}
                  bio={`Experienced ${doctor.specialty.toLowerCase()} with a focus on patient care and wellbeing.`}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Doctors;
