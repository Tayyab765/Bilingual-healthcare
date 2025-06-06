import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Video, Headphones, Heart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import LanguageToggle from '@/components/LanguageToggle';
const Header = () => {
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <header className="border-b bg-white py-3 px-4 md:px-6">
      <div className="flex items-center justify-between">
        {/* Logo/Brand section */}
        <div className="flex items-center">
          <Logo className="flex-shrink-0" />
        </div>


        {/* Actions section */}
        <div className="flex items-center space-x-4">
          <LanguageToggle size="sm" className="hidden md:flex" />
          {!isLoggedIn ? (
            <>
              <Button asChild variant="ghost" className="hidden md:flex">
                <Link to="/doctor/signup">Join as Doctor</Link>
              </Button>
              <Button className="bg-healthcare-primary hover:bg-healthcare-secondary rounded-full px-6">
                <Link to="/login" className="text-white">Login</Link>
              </Button>
            </>
          ) : (
            <Button asChild className="bg-healthcare-primary hover:bg-healthcare-secondary rounded-full px-6">
              <Link to="/dashboard" className="text-white">Dashboard</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

const LandingPage = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const serviceCards = [
    {
      title: 'Video Consultation',
      description: 'Verified Healthcare Professionals',
      icon: <Video className="h-6 w-6 text-healthcare-primary" />,
      bgColor: 'bg-blue-50',
      link: '/video-consultation'
    },
    {
      title: 'In-clinic Visit',
      description: 'Book Appointment',
      icon: <MapPin className="h-6 w-6 text-healthcare-primary" />,
      bgColor: 'bg-orange-50',
      link: '/appointments'
    }
  ];

  const symptoms = [
    { name: 'Fever', image: '/typhoid-fever.png' },
    { name: 'Heart attack', image: '/heart.png' },
    { name: 'Pregnancy', image: '/pregrent.png' },
    { name: 'High blood pressure', image: '/blood-pressure.png' },
    { name: 'Breathlessness', image: '/breathlessness.png' },
    { name: 'Diarrhea', image: '/diarrea.png' },
    { name: 'Hairfall', image: '/hairfall.png' },
    { name: 'Anxiety/Depression', image: '/anxiety.png' },
  ];

  const diseases = [
    { name: 'Dengue fever', image: '/dengue-fever.png' },
    { name: 'Typhoid Fever', image: '/typhoid-fever.png' },
    { name: 'Piles', image: '/piles.png' },
    { name: 'Gastritis', image: '/gastritis.png' },
    { name: 'Dentistry', image: '/th.png' },
    { name: 'Vaginal Infection', image: '/vaginalinfection.png' },
    { name: 'Migraine', image: '/migrain.png' },
    { name: 'TB', image: '/tb.png' },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Irfan Muddassir",
      avatar: "👨‍💼",
      review: "It is really good initiative to connect with health care personals. If you feel a need for help then helpline is there to take care of it. overall very good experience.",
      rating: 5,
      tag: "Good"
    },
    {
      id: 2,
      name: "Umair Ali",
      avatar: "👨‍💼",
      review: "I got late on my appointment, but after 10 minutes, the doctor called me and prescribed medicines, which is far better than appointing physically and waiting!",
      rating: 5,
      tag: "Good"
    },
    {
      id: 3,
      name: "Misbah Khan",
      avatar: "👨‍💼",
      review: "My first appointment today. It was a very smooth experience and the skin specialist was very helpful and professional. experiences so far facility is also very good.",
      rating: 5,
      tag: "Satisfied"
    },
  ];

  return (
    <div className="min-h-screen bg-healthcare-bg">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main>
        {/* Hero section with search */}
        <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="mb-5 flex items-center">
            <div className="w-10 h-10 bg-healthcare-light rounded-full flex items-center justify-center mr-3">
              <span className="text-lg">G</span>
            </div>
            <p className="text-gray-600">Hello, Guest!</p>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-healthcare-primary to-blue-500 bg-clip-text text-transparent">
            Find the Best Doctor Near You
          </h1>
          
          <form onSubmit={handleSearch} className="mb-10">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative w-full md:w-1/3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Enter City"
                  list="city-options"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="bg-white border border-gray-200 text-gray-700 py-3 px-4 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
                />
                <datalist id="city-options">
                  <option value="New York" />
                  <option value="Los Angeles" />
                  <option value="Chicago" />
                  <option value="Houston" />
                  <option value="Phoenix" />
                  <option value="Philadelphia" />
                  <option value="San Antonio" />
                  <option value="San Diego" />
                </datalist>
              </div>
              
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search by Symptoms"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 px-4 pl-10 rounded-lg border border-gray-200 focus:ring-2 focus:ring-healthcare-primary"
                />
                <Button 
                  type="submit" 
                  className="absolute right-1 top-1 bottom-1 bg-healthcare-primary hover:bg-healthcare-secondary rounded-lg text-white px-3"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
          
          {/* How can we help section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-6 text-indigo-600">
              How can we help you today?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 max-w-6xl mx-auto">
              {serviceCards.map((card, index) => (
                <Link
                  key={index}
                  to={card.link}
                  className={`${card.bgColor} rounded-lg p-6 flex flex-col hover:shadow-lg transition-all h-64 w-full sm:w-1/2`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-full">
                      <h3 className={`text-lg font-medium ${index === 0 ? 'text-navy-800' : 'text-gray-800'}`}>
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600">{card.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex items-center justify-center">
                    {index === 0 && (
                      <img 
                        src="/videoconsultation.png" 
                        alt="Doctor with thumbs up" 
                        className="h-40 w-auto" 
                      />
                    )}
                    {index === 1 && (
                      <img 
                        src="/clinic.png" 
                        alt="Doctor in clinic" 
                        className="h-40 w-auto"
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Symptoms Section */}
        <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Symptoms</h2>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                  <img 
                    src={symptom.image} 
                    alt={symptom.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg'; // Fallback image
                    }}
                  />
                </div>
                <span className="text-xs text-center">{symptom.name}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Diseases Section */}
        <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Diseases</h2>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {diseases.map((disease, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                  <img 
                    src={disease.image} 
                    alt={disease.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg'; // Fallback image
                    }}
                  />
                </div>
                <span className="text-xs text-center">{disease.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto mb-10">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Patient Testimonials
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-healthcare-light flex items-center justify-center text-lg">
                    {testimonial.avatar}
                  </div>
                  <span className="font-medium">{testimonial.name}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{testimonial.review}</p>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  <span className="text-sm px-3 py-1 bg-healthcare-light text-healthcare-primary rounded-full">
                    {testimonial.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-8 px-6 border-t">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} <span className="text-healthcare-primary font-medium">Bilingual Healthcare</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
