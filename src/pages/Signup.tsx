import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, ChevronRight, ChevronLeft, Calendar, Phone, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const Signup = () => {
  // Initial signup form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // Profile details state
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Medical history state
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [chronicConditions, setChronicConditions] = useState('');
  const [pastSurgeries, setPastSurgeries] = useState('');
  const [familyMedicalHistory, setFamilyMedicalHistory] = useState('');
  const [bloodType, setBloodType] = useState('');
  
  // Step tracking
  const [currentStep, setCurrentStep] = useState(1);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Calculate progress percentage
  const progressPercentage = (currentStep / 3) * 100;

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: "Error!",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        title: "Error!",
        description: "You must agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }
    
    // Proceed to next step
    setCurrentStep(2);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dateOfBirth || !gender || !phone || !address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields. All are required for better healthcare service.",
        variant: "destructive",
      });
      return;
    }
    
    // Proceed to medical history step
    setCurrentStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!allergies || !medications || !chronicConditions || !pastSurgeries || !familyMedicalHistory || !bloodType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all medical history fields. If not applicable, type 'None'.",
        variant: "destructive",
      });
      return;
    }
    
    // Save all user data (in a real app, this would be an API call)
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userProfile', JSON.stringify({
      name,
      email,
      dateOfBirth,
      gender,
      phone,
      address,
      medicalHistory: {
        allergies,
        medications,
        chronicConditions,
        pastSurgeries,
        familyMedicalHistory,
        bloodType
      }
    }));
    
    toast({
      title: "Profile complete!",
      description: "Your account has been successfully created.",
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 relative">
        {currentStep > 1 && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-4 top-4 h-8 w-8" 
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        
        {currentStep === 1 && (
          <Link to="/" className="absolute left-4 top-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}
        
        <div className="flex flex-col items-center justify-center mb-6 mt-6">
          <div className="mb-3">
            <div className="w-24 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Bilingual Healthcare</h1>
          <p className="text-sm text-gray-500 mb-4">Care That Speaks Your Language</p>
          
          <div className="w-full">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span className={currentStep >= 1 ? "text-green-500 font-medium" : ""}>Account</span>
              <span className={currentStep >= 2 ? "text-green-500 font-medium" : ""}>Personal Details</span>
              <span className={currentStep >= 3 ? "text-green-500 font-medium" : ""}>Medical History</span>
            </div>
          </div>
        </div>
        
        {currentStep === 1 && (
          <form onSubmit={handleInitialSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="pl-10"
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="pl-10"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
            </div>
            
            <div className="flex items-start">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="mr-2 mt-1 h-4 w-4"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <Link to="/terms" className="text-blue-500 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
              </label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="relative flex items-center justify-center mt-6">
              <div className="border-t border-gray-200 w-full"></div>
              <div className="bg-white px-2 text-sm text-gray-500 absolute">or</div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button variant="outline" className="w-full">
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                Sign up with Google
              </Button>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
              </p>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Details</h2>
            <p className="text-sm text-gray-500 mb-4">All fields are required for better healthcare service.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                <div className="relative">
                  <Input
                    id="dob"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                {/* Changed to Select dropdown instead of radio buttons to save space */}
                <Select value={gender} onValueChange={setGender} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="pl-10"
                  required
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <div className="relative">
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="pl-10 min-h-[80px]"
                  required
                />
                <MapPin className="absolute left-3 top-6 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        )}
        
        {currentStep === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Medical History</h2>
            <p className="text-sm text-gray-500 mb-4">All fields are required for better healthcare service. If not applicable, please type 'None'.</p>
            
            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">Do you have any allergies? *</label>
              <div className="relative">
                <Textarea
                  id="allergies"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="List any allergies or type 'None'"
                  className="min-h-[60px]"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="medications" className="block text-sm font-medium text-gray-700 mb-1">Current Medications *</label>
              <div className="relative">
                <Textarea
                  id="medications"
                  value={medications}
                  onChange={(e) => setMedications(e.target.value)}
                  placeholder="List any medications you're currently taking or type 'None'"
                  className="min-h-[60px]"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="conditions" className="block text-sm font-medium text-gray-700 mb-1">Chronic Conditions *</label>
              <div className="relative">
                <Textarea
                  id="conditions"
                  value={chronicConditions}
                  onChange={(e) => setChronicConditions(e.target.value)}
                  placeholder="List any chronic conditions or type 'None'"
                  className="min-h-[60px]"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="surgeries" className="block text-sm font-medium text-gray-700 mb-1">Past Surgeries *</label>
                <div className="relative">
                  <Input
                    id="surgeries"
                    type="text"
                    value={pastSurgeries}
                    onChange={(e) => setPastSurgeries(e.target.value)}
                    placeholder="Any past surgeries or 'None'"
                    required
                  />
                </div>
              </div>
              
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">Blood Type *</label>
                <Select value={bloodType} onValueChange={setBloodType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="Unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label htmlFor="familyHistory" className="block text-sm font-medium text-gray-700 mb-1">Family Medical History *</label>
              <div className="relative">
                <Textarea
                  id="familyHistory"
                  value={familyMedicalHistory}
                  onChange={(e) => setFamilyMedicalHistory(e.target.value)}
                  placeholder="Any relevant family medical history or 'None'"
                  className="min-h-[60px]"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-start mt-4">
              <Checkbox
                id="dataConsent"
                defaultChecked={true}
                className="mr-2 mt-1 h-4 w-4"
                required
              />
              <label htmlFor="dataConsent" className="text-sm text-gray-600">
                I consent to the storage and processing of my medical information for healthcare purposes
              </label>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => setCurrentStep(2)}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Complete Registration
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
