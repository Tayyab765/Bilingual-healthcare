
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import AdminSidebar from '@/components/AdminSidebar';
import { Bell, Check, X } from 'lucide-react';
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

const AdminVerifyDoctors = () => {
  // Example pending doctors data - in a real app, this would come from an API
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
      documents: ["Medical License", "Board Certification", "Resume"]
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
      documents: ["Medical License", "Board Certification", "Resume"]
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
      documents: ["Medical License", "Board Certification", "Resume"]
    }
  ]);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  
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
  
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
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
                              <AvatarFallback>{doctor.name.charAt(3)}</AvatarFallback>
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
                          <div className="flex gap-1">
                            {doctor.documents.map((doc, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {doc}
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
    </div>
  );
};

export default AdminVerifyDoctors;
