
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Calendar, 
  MapPin, 
  Building, 
  Languages, 
  Award, 
  Check, 
  XCircle,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const DoctorProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Personal Information
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState('');
  const [bio, setBio] = useState('');
  
  // Languages
  const [languages, setLanguages] = useState<{name: string, fluent: boolean}[]>([
    { name: 'English', fluent: false },
    { name: 'Spanish', fluent: false },
    { name: 'French', fluent: false },
    { name: 'Arabic', fluent: false },
    { name: 'Hindi', fluent: false },
    { name: 'Chinese', fluent: false },
  ]);
  
  // Certifications
  const [certifications, setCertifications] = useState<File[]>([]);
  
  // Practice Information
  const [practiceAddress, setPracticeAddress] = useState('');
  const [affiliation, setAffiliation] = useState('');
  
  // Availability
  const [availableDays, setAvailableDays] = useState<{day: string, selected: boolean, slots: string[]}[]>([
    { day: 'Monday', selected: false, slots: [] },
    { day: 'Tuesday', selected: false, slots: [] },
    { day: 'Wednesday', selected: false, slots: [] },
    { day: 'Thursday', selected: false, slots: [] },
    { day: 'Friday', selected: false, slots: [] },
    { day: 'Saturday', selected: false, slots: [] },
    { day: 'Sunday', selected: false, slots: [] },
  ]);
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };
  
  const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCertifications(prev => [...prev, ...Array.from(e.target.files as FileList)]);
    }
  };
  
  const handleLanguageToggle = (index: number) => {
    const newLanguages = [...languages];
    newLanguages[index].fluent = !newLanguages[index].fluent;
    setLanguages(newLanguages);
  };
  
  const handleDayToggle = (index: number) => {
    const newAvailableDays = [...availableDays];
    newAvailableDays[index].selected = !newAvailableDays[index].selected;
    if (newAvailableDays[index].selected && newAvailableDays[index].slots.length === 0) {
      // Add default slots when a day is selected
      newAvailableDays[index].slots = ['09:00 - 12:00', '14:00 - 17:00'];
    }
    setAvailableDays(newAvailableDays);
  };
  
  const handleSlotsChange = (dayIndex: number, value: string) => {
    const newAvailableDays = [...availableDays];
    newAvailableDays[dayIndex].slots = value.split(',').map(slot => slot.trim());
    setAvailableDays(newAvailableDays);
  };
  
  const nextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!specialty || !experience || !bio) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!languages.some(lang => lang.fluent)) {
        toast({
          title: "Language selection required",
          description: "Please select at least one language you're fluent in.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 3) {
      if (!practiceAddress || !affiliation) {
        toast({
          title: "Practice information required",
          description: "Please provide your practice address and affiliation.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate final step
    if (!availableDays.some(day => day.selected)) {
      toast({
        title: "Availability required",
        description: "Please select at least one day of availability.",
        variant: "destructive",
      });
      return;
    }
    
    // Store doctor profile data (would be replaced with API call)
    const doctorProfile = {
      specialty,
      experience,
      bio,
      languages: languages.filter(lang => lang.fluent).map(lang => lang.name),
      practiceAddress,
      affiliation,
      availability: availableDays.filter(day => day.selected).map(day => ({
        day: day.day,
        slots: day.slots
      })),
      isPending: true
    };
    
    localStorage.setItem('doctorProfile', JSON.stringify(doctorProfile));
    
    toast({
      title: "Profile submitted",
      description: "Your profile has been submitted for review.",
    });
    
    // Navigate to pending approval page
    navigate('/doctor/pending-approval');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Complete Your Doctor Profile
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Please provide your professional details to join our healthcare platform
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-10">
              <div 
                className="bg-healthcare-primary h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal & Professional Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Professional Information
                  </h2>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <Label htmlFor="specialty" className="mb-1 block">Medical Specialty</Label>
                      <Input
                        id="specialty"
                        placeholder="e.g., Cardiology, Pediatrics"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="flex-1">
                      <Label htmlFor="experience" className="mb-1 block">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        min="1"
                        placeholder="e.g., 5"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio" className="mb-1 block">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Describe your professional background, expertise, and approach to patient care."
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      required
                      className="resize-none"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="profilePicture" className="mb-1 block">Profile Picture</Label>
                    <div className="flex items-center space-x-4">
                      {profilePicturePreview ? (
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                          <img 
                            src={profilePicturePreview} 
                            alt="Profile preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      
                      <label className="cursor-pointer bg-gray-50 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        <span className="text-sm font-medium text-gray-700">Choose file</span>
                        <Input
                          id="profilePicture"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleProfilePictureChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Languages and Certifications */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Languages & Certifications
                  </h2>
                  
                  <div>
                    <Label className="mb-3 block">Languages You Speak Fluently</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {languages.map((language, index) => (
                        <div key={language.name} className="flex items-center space-x-2">
                          <Checkbox
                            id={`language-${index}`}
                            checked={language.fluent}
                            onCheckedChange={() => handleLanguageToggle(index)}
                          />
                          <label
                            htmlFor={`language-${index}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {language.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="certifications" className="mb-1 block">
                      Upload Your Certifications (Medical License, Board Certifications, etc.)
                    </Label>
                    <div className="mt-2">
                      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            Drag and drop or click to upload
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF, JPG, or PNG (max 10MB each)
                          </p>
                        </div>
                        <Input
                          id="certifications"
                          type="file"
                          multiple
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleCertificationChange}
                        />
                      </label>
                    </div>
                    
                    {certifications.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <Label className="block">Uploaded Files ({certifications.length})</Label>
                        <ul className="space-y-2">
                          {certifications.map((file, index) => (
                            <li key={index} className="text-sm flex items-center text-gray-700">
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                              {file.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Step 3: Practice Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Practice Information
                  </h2>
                  
                  <div>
                    <Label htmlFor="practiceAddress" className="mb-1 block">
                      Practice Address (where you'll see patients)
                    </Label>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-2" />
                      <Textarea
                        id="practiceAddress"
                        placeholder="Enter the complete address of your practice"
                        rows={3}
                        value={practiceAddress}
                        onChange={(e) => setPracticeAddress(e.target.value)}
                        required
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="affiliation" className="mb-1 block">
                      Hospital/Clinic Affiliation
                    </Label>
                    <div className="flex items-center">
                      <Building className="w-5 h-5 text-gray-400 mr-2" />
                      <Input
                        id="affiliation"
                        placeholder="e.g., City General Hospital, Smith Medical Group"
                        value={affiliation}
                        onChange={(e) => setAffiliation(e.target.value)}
                        required
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 4: Availability */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Your Availability
                  </h2>
                  
                  <div>
                    <Label className="mb-3 block">Select days when you're available for appointments</Label>
                    
                    <div className="space-y-4">
                      {availableDays.map((day, index) => (
                        <div key={day.day} className="rounded-lg border p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Checkbox
                              id={`day-${index}`}
                              checked={day.selected}
                              onCheckedChange={() => handleDayToggle(index)}
                            />
                            <Label htmlFor={`day-${index}`} className="font-medium">{day.day}</Label>
                          </div>
                          
                          {day.selected && (
                            <div className="ml-7">
                              <Label htmlFor={`slots-${index}`} className="text-sm mb-1 block">
                                Time slots (e.g., 09:00 - 12:00, 14:00 - 17:00)
                              </Label>
                              <Input
                                id={`slots-${index}`}
                                placeholder="Enter time slots separated by commas"
                                value={day.slots.join(', ')}
                                onChange={(e) => handleSlotsChange(index, e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="bg-healthcare-primary hover:bg-healthcare-secondary">
                    Submit Profile
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileSetup;
