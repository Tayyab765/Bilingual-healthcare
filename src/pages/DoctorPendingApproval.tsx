
import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DoctorPendingApproval = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-blue-50 p-4">
            <ClipboardCheck className="h-12 w-12 text-healthcare-primary" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Profile Under Review
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for submitting your profile. Our team is reviewing your credentials.
          This process typically takes 1-3 business days.
        </p>
        
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Under Review</h3>
                <p className="text-sm text-gray-600">
                  Your profile and certifications are being verified by our team
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 opacity-50">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Approval</h3>
                <p className="text-sm text-gray-600">
                  Once approved, you'll be able to set your availability and start accepting appointments
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10">
          <p className="text-sm text-gray-600 mb-4">
            We'll notify you via email once your profile is approved.
          </p>
          
          <Button asChild variant="outline" className="w-full">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorPendingApproval;
