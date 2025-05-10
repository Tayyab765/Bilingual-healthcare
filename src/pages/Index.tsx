import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DoctorCard from '../components/DoctorCard';
import SpecialtyCard from '../components/SpecialtyCard';
import { DentalIcon, OrthopedicIcon, GeneralIcon } from '../components/SpecialtyIcons';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  const doctors = [
    { name: 'Dr. Ali', specialty: 'Orthopedic', delay: 0.1 },
    { name: 'Dr. Ateeb', specialty: 'Neurologist', delay: 0.2 },
    { name: 'Dr. Saad', specialty: 'Heart Specialist', delay: 0.3 },
    { name: 'Dr. Ahmad', specialty: 'Medical Specialist', delay: 0.4 }
  ];

  const specialties = [
    { 
      title: 'Dental Doctor', 
      description: 'Regular dental checkups and cleanings', 
      price: 24.00, 
      rating: 4.9, 
      icon: <DentalIcon />,
      delay: 0.1
    },
    { 
      title: 'Orthopedic Doctor', 
      description: 'Issues related to bones and joints', 
      price: 26.00, 
      rating: 4.6, 
      icon: <OrthopedicIcon />,
      delay: 0.2
    },
    { 
      title: 'General Check Up', 
      description: 'For daily check up and consultations', 
      price: 23.00, 
      rating: 4.5, 
      icon: <GeneralIcon />,
      delay: 0.3
    }
  ];

  return (
    <div className="min-h-screen bg-healthcare-bg flex w-full">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="py-6 sm:py-8 px-4 sm:px-6 md:px-10">
          <section className="mb-8 sm:mb-12 page-container">
            <h2 className="section-heading text-xl sm:text-2xl font-semibold mb-6">Top Doctors</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {doctors.map((doctor, index) => (
                <DoctorCard 
                  key={index}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  delay={doctor.delay}
                />
              ))}
            </div>
          </section>
          
          <section className="page-container mb-8 sm:mb-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
              <h2 className="section-heading text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">Book Your Appointment</h2>
              
              <div className="flex gap-2 self-end sm:self-auto">
                <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-all duration-200 hover:bg-gray-200">
                  <ChevronLeft size={isMobile ? 16 : 20} />
                </button>
                <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-healthcare-primary flex items-center justify-center text-white transition-all duration-200 hover:bg-healthcare-secondary">
                  <ChevronRight size={isMobile ? 16 : 20} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {specialties.map((specialty, index) => (
                <SpecialtyCard 
                  key={index}
                  title={specialty.title}
                  description={specialty.description}
                  price={specialty.price}
                  rating={specialty.rating}
                  icon={specialty.icon}
                  delay={specialty.delay}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
