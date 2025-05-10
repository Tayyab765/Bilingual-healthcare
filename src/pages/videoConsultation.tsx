import React, { useState } from 'react';
import { Star, Video, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate, Link } from 'react-router-dom';

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "/placeholder.svg",
    experience: 15,
    rating: 4.8,
    reviews: 124,
    languages: ["English", "Spanish"],
    available: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    image: "/placeholder.svg",
    experience: 12,
    rating: 4.7,
    reviews: 98,
    languages: ["English", "Mandarin"],
    available: true,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Neurologist",
    image: "/placeholder.svg",
    experience: 18,
    rating: 4.9,
    reviews: 156,
    languages: ["English", "Spanish", "Portuguese"],
    available: false,
  },
  {
    id: 4,
    name: "Dr. David Kim",
    specialty: "Orthopedic Surgeon",
    image: "/placeholder.svg",
    experience: 10,
    rating: 4.6,
    reviews: 87,
    languages: ["English", "Korean"],
    available: true,
  },
  {
    id: 5,
    name: "Dr. Lisa Taylor",
    specialty: "Psychiatrist",
    image: "/placeholder.svg",
    experience: 14,
    rating: 4.9,
    reviews: 132,
    languages: ["English", "French"],
    available: true,
  },
  {
    id: 6,
    name: "Dr. Ahmed Hassan",
    specialty: "Pediatrician",
    image: "/placeholder.svg",
    experience: 11,
    rating: 4.8,
    reviews: 105,
    languages: ["English", "Arabic"],
    available: true,
  },
  {
    id: 7,
    name: "Dr. Maria Gonzalez",
    specialty: "Gynecologist",
    image: "/placeholder.svg", 
    experience: 16,
    rating: 4.9,
    reviews: 148,
    languages: ["English", "Spanish"],
    available: true,
  },
  {
    id: 8,
    name: "Dr. John Williams",
    specialty: "Ophthalmologist",
    image: "/placeholder.svg",
    experience: 13,
    rating: 4.7,
    reviews: 92,
    languages: ["English"],
    available: false,
  }
];

const VideoConsultation = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  
  // Filter doctors based on search and specialty
  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;
    return matchesSearch && matchesSpecialty;
  });
  
  // Get unique specialties for filter dropdown
  const specialties = [...new Set(mockDoctors.map(doctor => doctor.specialty))];
  
  const handleBooking = (doctorId) => {
    navigate(`/appointments/book?doctorId=${doctorId}&type=video`);
  };
  
  const handleViewProfile = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Video Consultation</h1>
            <p className="text-gray-500">Book a video appointment with our verified healthcare professionals</p>
          </div>
          
          {/* Search and filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by doctor name or specialty"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-1/3">
                <select
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty, index) => (
                    <option key={index} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Doctor cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">{doctor.name}</h3>
                      <p className="text-healthcare-primary font-medium">{doctor.specialty}</p>
                      
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                        <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                      </div>
                      
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">{doctor.experience} years experience</span>
                      </div>
                      
                      <div className="mt-1">
                        <span className="text-sm text-gray-600">
                          Speaks: {doctor.languages.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button 
                      className="flex-1 bg-healthcare-primary hover:bg-healthcare-secondary"
                      disabled={!doctor.available}
                      onClick={() => handleBooking(doctor.id)}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Book Video Call
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewProfile(doctor.id)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredDoctors.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="text-lg font-medium text-gray-900">No doctors found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default VideoConsultation;