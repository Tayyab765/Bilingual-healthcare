import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import AdminSidebar from '@/components/AdminSidebar';
import { Bell, Check, X, FileText, File, FileBadge, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminVerifyDoctors = () => {
  // Example pending doctors data with document URLs
  const [pendingDoctors, setPendingDoctors] = useState([
    {
      id: "1",
      name: "Dr. Robert Johnson",
      email: "dr.johnson@example.com",
      specialty: "Cardiology",
      experience: "10 years",
      phone: "+1 234 567 890",
      status: "Pending",
      dateApplied: "2025-04-20",
      documents: [
        { 
          type: "Medical License", 
          url: "https://example.com/documents/license.pdf",
          previewImage: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg" // Sample image for preview
        },
        { 
          type: "Board Certification", 
          url: "https://example.com/documents/certification.pdf",
          previewImage: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
        },
        { 
          type: "Resume", 
          url: "https://example.com/documents/resume.pdf",
          previewImage: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
        }
      ]
    },
    {
      id: "2",
      name: "Dr. Lisa Anderson",
      email: "dr.anderson@example.com",
      specialty: "Pediatrics",
      experience: "7 years",
      phone: "+1 987 654 321",
      status: "Pending",
      dateApplied: "2025-04-22",
      documents: [
        { 
          type: "Medical License", 
          url: "https://example.com/documents/license_anderson.pdf",
          previewImage: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
        },
        { 
          type: "Board Certification", 
          url: "https://example.com/documents/certification_anderson.pdf",
          previewImage: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
        },
        { 
          type: "Resume", 
          url: "https://example.com/documents/resume_anderson.pdf",
          previewImage: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
        }
      ]
    },
    {
      id: "3",
      name: "Dr. James Martin",
      email: "dr.martin@example.com",
      specialty: "Dermatology",
      experience: "5 years",
      phone: "+1 567 890 123",
      status: "Pending",
      dateApplied: "2025-04-23",
      documents: [
        { 
          type: "Medical License", 
          url: "https://example.com/documents/license_martin.pdf",
          previewImage: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
        },
        { 
          type: "Board Certification", 
          url: "https://example.com/documents/certification_martin.pdf",
          previewImage: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
        },
        { 
          type: "Resume", 
          url: "https://example.com/documents/resume_martin.pdf",
          previewImage: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
        }
      ]
    }
  ]);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  
  // State for document viewer dialog
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState('');

  const openRejectDialog = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setRejectionReason('');
    setOpenDialog(true);
  };
  
  const handleApprove = (doctorId: string) => {
    // In a real application, this would make an API call to approve the doctor
    setPendingDoctors(pendingDoctors.filter(doctor => doctor.id !== doctorId));
    toast.success("Doctor has been approved successfully");
  };
  
  const handleReject = () => {
    // In a real application, this would make an API call to reject the doctor with the reason
    if (selectedDoctorId) {
      setPendingDoctors(pendingDoctors.filter(doctor => doctor.id !== selectedDoctorId));
      setOpenDialog(false);
      toast.info("Doctor application has been rejected");
    }
  };

  // Open document viewer dialog
  const handleViewDocument = (doctorId: string, docType: string) => {
    const doctor = pendingDoctors.find(d => d.id === doctorId);
    if (doctor) {
      setSelectedDoctor(doctor);
      setSelectedDocumentType(docType);
      setDocumentViewerOpen(true);
    }
  };
  
  // Get the appropriate document for the selected doctor and document type
  const getSelectedDocument = () => {
    if (!selectedDoctor) return null;
    return selectedDoctor.documents.find(doc => doc.type === selectedDocumentType);
  };

  // Function to get icon based on document type
  const getDocumentIcon = (docType: string) => {
    switch (docType.toLowerCase()) {
      case 'medical license':
        return <FileBadge className="h-4 w-4 mr-1" />;
      case 'board certification':
        return <FileText className="h-4 w-4 mr-1" />;
      case 'resume':
        return <File className="h-4 w-4 mr-1" />;
      default:
        return <File className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden pl-64">
        <div className="bg-white shadow-sm z-10 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Verify Doctors</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">New Doctor Registration</span>
                  <span className="text-sm text-gray-500">Dr. Smith needs verification</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">Appointment Update</span>
                  <span className="text-sm text-gray-500">10 new appointments today</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">System Update</span>
                  <span className="text-sm text-gray-500">New features available</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <main className="flex-1 overflow-y-auto p-6">
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingDoctors.map((doctor) => (
                      <TableRow key={doctor.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{doctor.name}</p>
                              <p className="text-xs text-gray-500">{doctor.phone}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{doctor.email}</TableCell>
                        <TableCell>{doctor.specialty}</TableCell>
                        <TableCell>{doctor.experience}</TableCell>
                        <TableCell>{doctor.dateApplied}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {doctor.documents.map((doc, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="text-xs cursor-pointer hover:bg-gray-100 flex items-center"
                                onClick={() => handleViewDocument(doctor.id, doc.type)}
                              >
                                {getDocumentIcon(doc.type)}
                                {doc.type}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleApprove(doctor.id)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => openRejectDialog(doctor.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {pendingDoctors.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                          No pending doctor verifications
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      
      {/* Rejection Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Doctor Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this doctor's application. This information will be sent to the doctor.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter rejection reason..."
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={rejectionReason.trim().length === 0}
            >
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Viewer Dialog */}
      <Dialog open={documentViewerOpen} onOpenChange={setDocumentViewerOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedDocumentType && getDocumentIcon(selectedDocumentType)}
              {selectedDocumentType} - {selectedDoctor?.name}
            </DialogTitle>
            <DialogDescription>
              Review the document submitted by the doctor.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2">
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Document Preview</TabsTrigger>
                <TabsTrigger value="details">Document Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="mt-4">
                <div className="border rounded-lg overflow-hidden bg-gray-50">
                  <div className="h-[400px] relative">
                    {/* Document preview - in a real app, you'd use a PDF viewer or image preview */}
                    {getSelectedDocument() && (
                      <img 
                        src={getSelectedDocument()?.previewImage} 
                        alt={`${selectedDocumentType} preview`}
                        className="w-full h-full object-contain p-2"
                      />
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => window.open(getSelectedDocument()?.url, "_blank")}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Full Document
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-1 text-gray-500">Document Type</h4>
                      <p>{selectedDocumentType}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1 text-gray-500">Uploaded By</h4>
                      <p>{selectedDoctor?.name}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1 text-gray-500">Submission Date</h4>
                      <p>{selectedDoctor?.dateApplied}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1 text-gray-500">File Format</h4>
                      <p>PDF</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-1 text-gray-500">Document Description</h4>
                    <p className="text-sm text-gray-600">
                      {selectedDocumentType === "Medical License" && 
                        "Official medical license issued by the medical board verifying the doctor's ability to practice medicine."}
                      {selectedDocumentType === "Board Certification" && 
                        "Certification that verifies the doctor has completed specialized training and examinations in their field."}
                      {selectedDocumentType === "Resume" && 
                        "Professional resume detailing the doctor's education, work experience, skills, and achievements."}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2 text-gray-500">Verification Actions</h4>
                    <div className="flex gap-2">
                      <Button 
                        variant="default" 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => toast.success(`${selectedDocumentType} verified successfully`)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Verify Document
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-red-500 border-red-200 hover:bg-red-50"
                        onClick={() => toast.error(`${selectedDocumentType} marked as invalid`)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Mark as Invalid
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDocumentViewerOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminVerifyDoctors;
