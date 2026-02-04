import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Appointments, Departments } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointments[]>([]);
  const [departments, setDepartments] = useState<Departments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [reason, setReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [appointmentsResult, deptResult] = await Promise.all([
      BaseCrudService.getAll<Appointments>('appointments', {}, { limit: 100 }),
      BaseCrudService.getAll<Departments>('departments', {}, { limit: 50 }),
    ]);

    const upcomingAppointments = appointmentsResult.items
      .filter(a => a.status !== 'Completed' && a.status !== 'Cancelled')
      .sort((a, b) => {
        const dateA = new Date(a.appointmentDate || 0).getTime();
        const dateB = new Date(b.appointmentDate || 0).getTime();
        return dateA - dateB;
      });

    setAppointments(upcomingAppointments);
    setDepartments(deptResult.items);
    setIsLoading(false);
  };

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedDepartment || !userName || !userEmail) return;

    setIsBooking(true);

    const appointmentData: Appointments = {
      _id: crypto.randomUUID(),
      userId: crypto.randomUUID(),
      appointmentDate: selectedDate.toISOString(),
      appointmentTime: selectedTime,
      departmentName: selectedDepartment,
      status: 'Scheduled',
      reasonForVisit: reason,
    };

    await BaseCrudService.create('appointments', appointmentData);

    setShowSuccess(true);
    setSelectedDate(undefined);
    setSelectedTime('');
    setSelectedDepartment('');
    setUserName('');
    setUserEmail('');
    setReason('');
    setIsBooking(false);
    loadData();

    setTimeout(() => setShowSuccess(false), 5000);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Scheduled':
        return 'text-primary';
      case 'Confirmed':
        return 'text-accent-teal';
      case 'In Progress':
        return 'text-orange-600';
      case 'Completed':
        return 'text-green-600';
      default:
        return 'text-foreground/60';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="font-heading text-5xl md:text-6xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Appointments
            </h1>
            <p className="font-paragraph text-lg text-foreground/70">
              Schedule your appointment and manage your bookings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-8 bg-card-background backdrop-blur-sm">
                <h2 className="font-heading text-2xl mb-6">Book Appointment</h2>

                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-6 bg-green-50 border-2 border-green-500 rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <h3 className="font-heading text-lg text-green-900">Appointment Booked!</h3>
                        <p className="font-paragraph text-sm text-green-800">
                          You will receive a confirmation email shortly.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleBookAppointment} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="font-paragraph text-sm mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-paragraph text-sm mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="department" className="font-paragraph text-sm mb-2 block">
                      Select Department
                    </Label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept._id} value={dept.departmentName || ''}>
                            {dept.departmentName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="font-paragraph text-sm mb-2 block">
                      Select Date
                    </Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-xl border bg-card"
                    />
                  </div>

                  <div>
                    <Label htmlFor="time" className="font-paragraph text-sm mb-2 block">
                      Select Time
                    </Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="reason" className="font-paragraph text-sm mb-2 block">
                      Reason for Visit (Optional)
                    </Label>
                    <Textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Brief description of your visit"
                      className="w-full min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isBooking}
                    className="w-full py-6 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-heading text-lg font-semibold hover:scale-105 transition-transform"
                  >
                    {isBooking ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      'Book Appointment'
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Upcoming Appointments */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-8 bg-card-background backdrop-blur-sm min-h-[600px]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl">Upcoming Appointments</h2>
                  <div className="flex items-center gap-2 text-primary">
                    <CalendarIcon className="w-5 h-5" />
                    <span className="font-heading text-lg">{appointments.length}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {isLoading ? null : appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                      <motion.div
                        key={appointment._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-6 bg-card rounded-2xl shadow-sm border border-foreground/5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-heading text-xl mb-1">{appointment.departmentName}</h3>
                            <div className={`flex items-center gap-2 ${getStatusColor(appointment.status)}`}>
                              <AlertCircle className="w-4 h-4" />
                              <span className="font-paragraph text-sm">{appointment.status}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-foreground/70">
                            <CalendarIcon className="w-4 h-4" />
                            <span className="font-paragraph text-sm">
                              {appointment.appointmentDate && format(new Date(appointment.appointmentDate), 'MMMM dd, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-foreground/70">
                            <Clock className="w-4 h-4" />
                            <span className="font-paragraph text-sm">{appointment.appointmentTime}</span>
                          </div>
                          {appointment.reasonForVisit && (
                            <p className="font-paragraph text-sm text-foreground/60 mt-3 pt-3 border-t border-foreground/10">
                              {appointment.reasonForVisit}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-16">
                      <CalendarIcon className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                      <p className="font-paragraph text-foreground/60">No upcoming appointments</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
