
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, addDays, isAfter, isBefore, setHours, setMinutes } from 'date-fns';
import { CalendarIcon, Clock, CreditCard, Landmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date for your appointment.",
  }),
  time: z.string({
    required_error: "Please select a time slot.",
  }),
  notes: z.string().optional(),
  paymentMethod: z.enum(["insurance", "card"], {
    required_error: "Please select a payment method.",
  }).optional(),
  insuranceProvider: z.string().optional(),
});

const timeSlots = [
  "09:00 AM", "09:30 AM", 
  "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM",
  "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM"
];

const insuranceProviders = [
  "Blue Cross Blue Shield",
  "UnitedHealthcare",
  "Aetna",
  "Cigna",
  "Humana",
  "Kaiser Permanente",
  "Medicare",
  "Medicaid",
  "Other"
];

interface AppointmentBookingFormProps {
  doctorId: number;
  doctorName: string;
  appointmentType: 'physical' | 'online';
  onSuccess: () => void;
}

const AppointmentBookingForm: React.FC<AppointmentBookingFormProps> = ({
  doctorId,
  doctorName,
  appointmentType,
  onSuccess
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);
  const [paymentStep, setPaymentStep] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  // Watch date and time to determine when to show payment options
  const watchDate = form.watch("date");
  const watchTime = form.watch("time");

  // Disable past dates and weekends
  const disabledDays = (date: Date) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    // Disable past dates
    if (isBefore(date, now)) {
      return true;
    }
    
    // Disable dates more than 30 days in the future
    if (isAfter(date, addDays(now, 30))) {
      return true;
    }
    
    // Disable weekends (0 is Sunday, 6 is Saturday)
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  // When date changes, simulate fetching available time slots
  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    
    // Simulate backend call to get available slots
    // In a real app, this would be an API call to check availability
    const randomlyAvailableSlots = timeSlots.filter(() => Math.random() > 0.3);
    setAvailableTimeSlots(randomlyAvailableSlots.length ? randomlyAvailableSlots : timeSlots);
  };

  // Move to payment step after selecting date and time
  const handleContinueToPayment = () => {
    // Validate date and time first
    const dateValid = form.getFieldState("date").isDirty && !form.getFieldState("date").error;
    const timeValid = form.getFieldState("time").isDirty && !form.getFieldState("time").error;
    
    if (dateValid && timeValid) {
      setPaymentStep(true);
    } else {
      form.trigger(["date", "time"]);
    }
  };

  // Go back to appointment selection
  const handleBackToAppointment = () => {
    setPaymentStep(false);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Ensure we have payment method for submission
    if (appointmentType === 'physical' && !values.paymentMethod) {
      toast({
        title: "Payment method required",
        description: "Please select how you would like to pay for your appointment.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to create the appointment
    console.log("Booking appointment:", {
      doctorId,
      doctorName,
      type: appointmentType,
      date: values.date,
      time: values.time,
      notes: values.notes || "No additional notes",
      paymentMethod: values.paymentMethod || "card",
      insuranceProvider: values.insuranceProvider,
    });

    // Create a new appointment object
    const newAppointment = {
      id: Math.floor(Math.random() * 1000),
      doctor: doctorName,
      specialty: "Specialist", // This would come from the doctor data in a real app
      date: format(values.date, 'yyyy-MM-dd'),
      time: values.time,
      status: "Upcoming",
      notes: values.notes || "No additional notes",
      type: appointmentType,
      paymentMethod: values.paymentMethod || "card",
      insuranceProvider: values.insuranceProvider,
    };

    // Get existing appointments from localStorage or initialize empty array
    const existingAppointmentsJson = localStorage.getItem('appointments');
    const existingAppointments = existingAppointmentsJson ? JSON.parse(existingAppointmentsJson) : [];
    
    // Add new appointment
    const updatedAppointments = [...existingAppointments, newAppointment];
    
    // Save updated appointments to localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    // Show success toast
    toast({
      title: "Appointment Booked",
      description: `Your ${appointmentType} appointment with ${doctorName} has been scheduled for ${format(values.date, 'MMMM d, yyyy')} at ${values.time}.`,
    });

    // Call onSuccess callback to close dialogs
    onSuccess();

    // Navigate to appointments page
    navigate('/appointments');
  };

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {!paymentStep ? (
            // Step 1: Select appointment date and time
            <>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Appointment Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MMMM d, yyyy")
                            ) : (
                              <span>Select a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            handleDateChange(date);
                          }}
                          disabled={disabledDays}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select Time Slot</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                      >
                        {availableTimeSlots.map((time) => (
                          <div key={time}>
                            <RadioGroupItem
                              value={time}
                              id={time}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={time}
                              className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary text-sm cursor-pointer"
                            >
                              <Clock className="mr-2 h-4 w-4" />
                              {time}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any symptoms, questions, or specific concerns..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4">
                <Button 
                  type="button" 
                  className="bg-healthcare-primary hover:bg-healthcare-secondary"
                  onClick={handleContinueToPayment}
                >
                  Continue to Payment
                </Button>
              </div>
            </>
          ) : (
            // Step 2: Payment options
            <>
              <Card className="border-2 border-muted">
                <CardHeader>
                  <CardTitle>Appointment Summary</CardTitle>
                  <CardDescription>
                    Review your appointment details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Doctor:</span>
                    <span>{doctorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{watchDate ? format(watchDate, "MMMM d, yyyy") : 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Time:</span>
                    <span>{watchTime || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Type:</span>
                    <span className="capitalize">{appointmentType}</span>
                  </div>
                </CardContent>
              </Card>

              {appointmentType === 'physical' ? (
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="insurance" id="insurance" />
                            <label
                              htmlFor="insurance"
                              className="flex items-center rounded-md p-2 cursor-pointer"
                            >
                              <Landmark className="mr-2 h-4 w-4 text-blue-500" />
                              Use Insurance
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <label
                              htmlFor="card"
                              className="flex items-center rounded-md p-2 cursor-pointer"
                            >
                              <CreditCard className="mr-2 h-4 w-4 text-green-500" />
                              Pay with Card
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="py-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    Online appointments require direct payment. Insurance cannot be used for telehealth sessions.
                  </p>
                  <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/20">
                    <CreditCard className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Pay with Card</span>
                  </div>
                </div>
              )}

              {form.watch("paymentMethod") === "insurance" && (
                <FormField
                  control={form.control}
                  name="insuranceProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Provider</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {insuranceProviders.map(provider => (
                            <SelectItem key={provider} value={provider}>
                              {provider}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleBackToAppointment}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="bg-healthcare-primary hover:bg-healthcare-secondary"
                >
                  {appointmentType === 'physical' && form.watch("paymentMethod") === "insurance"
                    ? "Claim Insurance & Book"
                    : "Pay & Book Appointment"
                  }
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AppointmentBookingForm;
