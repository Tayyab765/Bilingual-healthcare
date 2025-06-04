import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Sidebar from '@/components/Sidebar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Trash, Eye, EyeOff } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA"
  });
  
  // Notification preferences state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  // Security settings state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Change password dialog state
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // State for account deactivation/deletion dialogs
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deactivationReason, setDeactivationReason] = useState('');
  const [deletionReason, setDeletionReason] = useState('');
  
  // State for confirmation dialog
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'deactivate' | 'delete' | null>(null);
  
  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.id]: e.target.value
    });
  };
  
  // Handle profile form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would make an API call here
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.id]: e.target.value
    });
  };
  
  // Handle password form submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordForm.currentPassword) {
      toast({
        title: "Current Password Required",
        description: "Please enter your current password.",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Your new password and confirmation don't match.",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Your new password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would make an API call here
    
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
    
    // Close dialog and reset form
    setIsChangePasswordDialogOpen(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };
  
  // Handle account deactivation
  const handleDeactivateAccount = () => {
    if (!deactivationReason.trim()) {
      toast({
        title: "Reason required",
        description: "Please provide a reason for deactivating your account.",
        variant: "destructive",
      });
      return;
    }

    setIsDeactivateDialogOpen(false);
    setConfirmAction('deactivate');
    setIsConfirmDialogOpen(true);
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    if (!deletionReason.trim()) {
      toast({
        title: "Reason required",
        description: "Please provide a reason for deleting your account.",
        variant: "destructive",
      });
      return;
    }

    setIsDeleteDialogOpen(false);
    setConfirmAction('delete');
    setIsConfirmDialogOpen(true);
  };

  // Final confirmation action
  const handleConfirmAction = () => {
    setIsConfirmDialogOpen(false);
    
    if (confirmAction === 'deactivate') {
      // API call would go here to deactivate the account
      localStorage.setItem('accountDeactivated', 'true');
      localStorage.setItem('deactivationReason', deactivationReason);
      
      toast({
        title: "Account Deactivated",
        description: "Your account has been deactivated. You can reactivate it anytime by logging back in.",
      });
      
      setTimeout(() => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
      }, 2000);
    } else if (confirmAction === 'delete') {
      // API call would go here to delete the account
      localStorage.setItem('accountDeleted', 'true');
      localStorage.setItem('deletionReason', deletionReason);
      
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted. We're sorry to see you go.",
      });
      
      setTimeout(() => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 w-full">
        <div className="container max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <div className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profileForm.fullName}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profileForm.address}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">Save Changes</Button>
                </form>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <Switch 
                    id="push-notifications"
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="destructive" 
                  onClick={() => setIsChangePasswordDialogOpen(true)}
                >
                  Change Password
                </Button>
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <Switch 
                    id="two-factor"
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Account Management */}
            <Card className="border-red-100">
              <CardHeader className="text-red-900">
                <CardTitle>Account Management</CardTitle>
                <CardDescription>Manage your account status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Deactivate Account Section */}
                <div className="border border-amber-200 bg-amber-50 rounded-md p-4">
                  <h3 className="text-lg font-medium text-amber-800 mb-2 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" /> Deactivate Account
                  </h3>
                  <p className="text-amber-700 mb-4">
                    Temporarily deactivating your account will hide your profile and pause all scheduled appointments. 
                    You can reactivate your account at any time by logging back in.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-amber-500 text-amber-700 hover:bg-amber-100" 
                    onClick={() => setIsDeactivateDialogOpen(true)}
                  >
                    Deactivate Account
                  </Button>
                </div>
                
                {/* Delete Account Section */}
                <div className="border border-red-200 bg-red-50 rounded-md p-4">
                  <h3 className="text-lg font-medium text-red-800 mb-2 flex items-center">
                    <Trash className="h-5 w-5 mr-2" /> Delete Account
                  </h3>
                  <p className="text-red-700 mb-4">
                    Permanently deleting your account will remove all your data from our system. This action cannot be undone.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Change Password Dialog */}
      <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Your Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password to update your security credentials.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handlePasswordSubmit} className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="mb-2 block">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2" 
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="mb-2 block">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2" 
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="mb-2 block">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsChangePasswordDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update Password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Deactivate Account Dialog */}
      <Dialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deactivate Your Account</DialogTitle>
            <DialogDescription>
              We're sorry to see you go. Please tell us why you're deactivating your account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="deactivate-reason" className="mb-2 block">
              Reason for deactivation
            </Label>
            <Textarea
              id="deactivate-reason"
              placeholder="Please provide a brief explanation for deactivating your account..."
              value={deactivationReason}
              onChange={(e) => setDeactivationReason(e.target.value)}
              className="min-h-[120px]"
              required
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeactivateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="default" 
              className="bg-amber-600 hover:bg-amber-700"
              onClick={handleDeactivateAccount}
            >
              Proceed with Deactivation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Account Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Your Account Permanently</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your data will be permanently removed.
              Please let us know why you're deleting your account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="delete-reason" className="mb-2 block">
              Reason for deletion
            </Label>
            <Textarea
              id="delete-reason"
              placeholder="Please provide a brief explanation for deleting your account..."
              value={deletionReason}
              onChange={(e) => setDeletionReason(e.target.value)}
              className="min-h-[120px]"
              required
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
            >
              Permanently Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Final Confirmation Dialog */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction === 'deactivate' ? 'Confirm Account Deactivation' : 'Confirm Account Deletion'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction === 'deactivate' 
                ? 'Are you sure you want to deactivate your account? Your profile will be hidden and all scheduled appointments will be paused.'
                : 'Are you absolutely sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmAction} 
              className={confirmAction === 'deactivate' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-red-600 hover:bg-red-700'}
            >
              {confirmAction === 'deactivate' ? 'Yes, Deactivate Account' : 'Yes, Delete Account'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
