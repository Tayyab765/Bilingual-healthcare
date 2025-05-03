import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Video, Headphones, Heart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import LanguageToggle from '@/components/LanguageToggle';
import { 
  Fever, 
  HeartAttack, 
  Pregnancy, 
  Breathlessness, 
  Diarrhea, 
  Hairfall, 
  HighBloodPressure 
} from '@/components/SymptomIcons';

const LandingPage = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

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
      link: '/appointments'
    },
    {
      title: 'In-clinic Visit',
      description: 'Book Appointment',
      icon: <MapPin className="h-6 w-6 text-healthcare-primary" />,
      bgColor: 'bg-orange-50',
      link: '/appointments'
    },
    {
      title: 'Instant Doctor',
      description: 'Get Instant Relief in a Click',
      icon: <Heart className="h-6 w-6 text-healthcare-primary" />,
      bgColor: 'bg-green-50',
      link: '/chat'
    },
    {
      title: 'Health Consultation',
      description: 'Healthy Lifestyle',
      icon: <Headphones className="h-6 w-6 text-healthcare-primary" />,
      bgColor: 'bg-yellow-50',
      link: '/appointments'
    }
  ];

  const categoryLinks = [
    { title: 'Labs', icon: '🔬', link: '/labs' },
    { title: 'Medicines', icon: '💊', link: '/medicines' },
    { title: 'Blogs', icon: '📝', link: '/blog' },
    { title: 'Hospitals', icon: '🏥', link: '/hospitals' },
    { title: 'Surgeries', icon: '⚕️', link: '/surgeries' },
  ];

  const symptoms = [
    { name: 'Fever', icon: <Fever /> },
    { name: 'Heart attack', icon: <HeartAttack /> },
    { name: 'Pregnancy', icon: <Pregnancy /> },
    { name: 'High blood pressure', icon: <HighBloodPressure /> },
    { name: 'Breathlessness', icon: <Breathlessness /> },
    { name: 'Diarrhea', icon: <Diarrhea /> },
    { name: 'Hairfall', icon: <Hairfall /> },
    { name: 'Anxiety/Depression', icon: <div className="symptom-icon">😔</div> },
  ];

  const diseases = [
    { name: 'Dengue fever', icon: '🦟' },
    { name: 'Typhoid Fever', icon: '🤒' },
    { name: 'Piles', icon: '💊' },
    { name: 'Gastritis', icon: '🧍' },
    { name: 'Hernia', icon: '⚕️' },
    { name: 'Vaginal Infection', icon: '🌷' },
    { name: 'Migraine', icon: '🤯' },
    { name: 'TB', icon: '🫁' },
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
      <header className="bg-white py-4 px-6 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo className="flex-shrink-0" />
          
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/doctors" className="text-gray-600 hover:text-healthcare-primary transition-colors">
              Find Doctors
            </Link>
            <Link to="/hospitals" className="text-gray-600 hover:text-healthcare-primary transition-colors">
              Hospitals
            </Link>
            <Link to="/surgeries" className="text-gray-600 hover:text-healthcare-primary transition-colors">
              Surgeries
            </Link>
            <Link to="/medicines" className="text-gray-600 hover:text-healthcare-primary transition-colors">
              Medicines
            </Link>
            <Link to="/labs" className="text-gray-600 hover:text-healthcare-primary transition-colors">
              Labs
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-healthcare-primary transition-colors">
              Blog
            </Link>
            <Link to="/forum" className="text-gray-600 hover:text-healthcare-primary transition-colors">
              Forum
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
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
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Find the Best Doctor Near You
          </h1>
          
          <form onSubmit={handleSearch} className="mb-10">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative w-full md:w-1/3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <select 
                  className="bg-white border border-gray-200 text-gray-700 py-3 px-4 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                >
                  <option value="">Enter City</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Houston">Houston</option>
                </select>
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
                  className="py-3 pl-10 rounded-lg border border-gray-200 focus:ring-2 focus:ring-healthcare-primary"
                />
                <Button 
                  type="submit" 
                  className="absolute right-1 top-1 bottom-1 bg-healthcare-primary hover:bg-healthcare-secondary rounded-lg text-white"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
          
          {/* How can we help section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              How can we help you today?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {serviceCards.map((card, index) => (
                <Link
                  key={index}
                  to={card.link}
                  className={`${card.bgColor} rounded-lg p-4 flex flex-col hover:shadow-md transition-shadow`}
                >
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="font-medium text-gray-800">{card.title}</h3>
                      <p className="text-sm text-gray-600">{card.description}</p>
                    </div>
                    {card.icon}
                  </div>
                  
                  <div className="mt-auto">
                    {index === 0 && (
                      <img 
                        src="/placeholder.svg" 
                        alt="Doctor with thumbs up" 
                        className="h-24 ml-auto"
                      />
                    )}
                    {index === 1 && (
                      <img 
                        src="/placeholder.svg" 
                        alt="Doctor in clinic" 
                        className="h-24 ml-auto"
                      />
                    )}
                    {index === 2 && (
                      <img 
                        src="/placeholder.svg" 
                        alt="Doctor on call" 
                        className="h-24 ml-auto"
                      />
                    )}
                    {index === 3 && (
                      <img 
                        src="/placeholder.svg" 
                        alt="Health consultation" 
                        className="h-24 ml-auto"
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Category links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categoryLinks.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="bg-white rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow text-center"
              >
                <span className="text-2xl mb-2">{category.icon}</span>
                <span className="text-gray-700">{category.title}</span>
              </Link>
            ))}
          </div>
          
          {/* Medical advice section */}
          <div className="mt-10 bg-green-50 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Get free medical advice by asking a doctor
              </h2>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-healthcare-primary">✓</span>
                  <span>Ask a question anonymously</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-healthcare-primary">✓</span>
                  <span>Get a reply from verified doctors</span>
                </li>
              </ul>
              
              <div className="flex gap-3 flex-wrap">
                <Button variant="outline" className="bg-white rounded-md">
                  View All Questions
                </Button>
                <Button className="bg-healthcare-primary hover:bg-healthcare-secondary rounded-md">
                  Ask a Question
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="/placeholder.svg" 
                alt="Doctor providing advice" 
                className="h-40"
              />
            </div>
          </div>
        </section>
        
        {/* Symptoms Section */}
        <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Symptoms</h2>
            <Link to="/symptoms" className="flex items-center text-healthcare-primary hover:underline">
              <span>View all</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-healthcare-light flex items-center justify-center mb-2">
                  {symptom.icon}
                </div>
                <span className="text-xs text-center">{symptom.name}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Diseases Section */}
        <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Diseases</h2>
            <Link to="/diseases" className="flex items-center text-healthcare-primary hover:underline">
              <span>View all</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {diseases.map((disease, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-healthcare-light flex items-center justify-center mb-2 text-2xl">
                  {disease.icon}
                </div>
                <span className="text-xs text-center">{disease.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Patient Testimonials</h2>
          
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
        
        {/* Doctor signup CTA */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Join Our Team as a Doctor
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Are you a healthcare professional looking to expand your practice? Join our network of multilingual doctors and connect with patients who need your expertise.
            </p>
            <Button 
              size="lg" 
              className="bg-healthcare-secondary hover:bg-healthcare-primary text-white px-8 py-6 h-auto text-lg rounded-md"
              onClick={() => navigate('/doctor/signup')}
            >
              Apply as a Doctor
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-8 px-6 border-t">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Bilingual Healthcare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
