import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, CheckCircle, AlertCircle, Loader2, TrendingUp } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { QueueTokens, Appointments } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { format } from 'date-fns';

export default function DashboardPage() {
  const [activeToken, setActiveToken] = useState<QueueTokens | null>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointments[]>([]);
  const [completedTokens, setCompletedTokens] = useState<QueueTokens[]>([]);
  const [completedAppointments, setCompletedAppointments] = useState<Appointments[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 15000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    const [tokensResult, appointmentsResult] = await Promise.all([
      BaseCrudService.getAll<QueueTokens>('tokens', {}, { limit: 100 }),
      BaseCrudService.getAll<Appointments>('appointments', {}, { limit: 100 }),
    ]);

    const activeTokensList = tokensResult.items.filter(t => t.isActive && t.status === 'Waiting');
    setActiveToken(activeTokensList.length > 0 ? activeTokensList[0] : null);

    const completed = tokensResult.items.filter(t => t.status === 'Completed');
    setCompletedTokens(completed.slice(0, 5));

    const upcoming = appointmentsResult.items
      .filter(a => a.status === 'Scheduled' || a.status === 'Confirmed')
      .sort((a, b) => {
        const dateA = new Date(a.appointmentDate || 0).getTime();
        const dateB = new Date(b.appointmentDate || 0).getTime();
        return dateA - dateB;
      });
    setUpcomingAppointments(upcoming.slice(0, 5));

    const completedAppts = appointmentsResult.items.filter(a => a.status === 'Completed');
    setCompletedAppointments(completedAppts.slice(0, 5));

    setIsLoading(false);
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'Waiting':
        return <Clock className="w-5 h-5" />;
      case 'In Progress':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'Completed':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
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
              My Dashboard
            </h1>
            <p className="font-paragraph text-lg text-foreground/70">
              Track your tokens, appointments, and history
            </p>
          </motion.div>

          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-32">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-8">
                {/* Active Token Section */}
                {activeToken && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="p-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="font-heading text-2xl">Your Active Token</h2>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(activeToken.status)}
                          <span className="font-paragraph text-sm">{activeToken.status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <p className="font-paragraph text-sm opacity-80 mb-2">Token Number</p>
                          <p className="font-heading text-4xl">{activeToken.tokenNumber}</p>
                        </div>
                        <div>
                          <p className="font-paragraph text-sm opacity-80 mb-2">Queue Position</p>
                          <p className="font-heading text-4xl">{activeToken.queuePosition}</p>
                        </div>
                        <div>
                          <p className="font-paragraph text-sm opacity-80 mb-2">Estimated Wait</p>
                          <p className="font-heading text-4xl">{activeToken.estimatedWaitTime} min</p>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-primary-foreground/20">
                        <p className="font-paragraph text-sm opacity-80">
                          Issued at: {activeToken.issuedAt && format(new Date(activeToken.issuedAt), 'MMM dd, yyyy hh:mm a')}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="p-6 bg-card-background backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-4">
                        <Clock className="w-8 h-8 text-primary" />
                        <TrendingUp className="w-5 h-5 text-accent-teal" />
                      </div>
                      <p className="font-paragraph text-sm text-foreground/60 mb-1">Total Tokens</p>
                      <p className="font-heading text-3xl">{completedTokens.length}</p>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="p-6 bg-card-background backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-4">
                        <Calendar className="w-8 h-8 text-accent-teal" />
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <p className="font-paragraph text-sm text-foreground/60 mb-1">Upcoming</p>
                      <p className="font-heading text-3xl">{upcomingAppointments.length}</p>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="p-6 bg-card-background backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="font-paragraph text-sm text-foreground/60 mb-1">Completed</p>
                      <p className="font-heading text-3xl">{completedAppointments.length}</p>
                    </Card>
                  </motion.div>
                </div>

                {/* Upcoming Appointments */}
                {upcomingAppointments.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="p-8 bg-card-background backdrop-blur-sm">
                      <h2 className="font-heading text-2xl mb-6">Upcoming Appointments</h2>
                      <div className="space-y-4">
                        {upcomingAppointments.map((appointment) => (
                          <div
                            key={appointment._id}
                            className="p-6 bg-card rounded-2xl shadow-sm border border-foreground/5"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-heading text-xl mb-2">{appointment.departmentName}</h3>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-foreground/70">
                                    <Calendar className="w-4 h-4" />
                                    <span className="font-paragraph text-sm">
                                      {appointment.appointmentDate && format(new Date(appointment.appointmentDate), 'MMMM dd, yyyy')}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-foreground/70">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-paragraph text-sm">{appointment.appointmentTime}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="px-4 py-2 rounded-full bg-primary/10 text-primary">
                                <span className="font-paragraph text-sm font-medium">{appointment.status}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* History Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Token History */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card className="p-8 bg-card-background backdrop-blur-sm">
                      <h2 className="font-heading text-2xl mb-6">Token History</h2>
                      <div className="space-y-3">
                        {completedTokens.length > 0 ? (
                          completedTokens.map((token) => (
                            <div
                              key={token._id}
                              className="p-4 bg-card rounded-xl border border-foreground/5 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <div>
                                  <p className="font-heading text-base">{token.tokenNumber}</p>
                                  <p className="font-paragraph text-xs text-foreground/60">
                                    {token.completedAt && format(new Date(token.completedAt), 'MMM dd, yyyy')}
                                  </p>
                                </div>
                              </div>
                              <span className="font-paragraph text-sm text-green-600">Completed</span>
                            </div>
                          ))
                        ) : (
                          <p className="font-paragraph text-sm text-foreground/60 text-center py-8">
                            No token history yet
                          </p>
                        )}
                      </div>
                    </Card>
                  </motion.div>

                  {/* Appointment History */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Card className="p-8 bg-card-background backdrop-blur-sm">
                      <h2 className="font-heading text-2xl mb-6">Appointment History</h2>
                      <div className="space-y-3">
                        {completedAppointments.length > 0 ? (
                          completedAppointments.map((appointment) => (
                            <div
                              key={appointment._id}
                              className="p-4 bg-card rounded-xl border border-foreground/5 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <div>
                                  <p className="font-heading text-base">{appointment.departmentName}</p>
                                  <p className="font-paragraph text-xs text-foreground/60">
                                    {appointment.appointmentDate && format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}
                                  </p>
                                </div>
                              </div>
                              <span className="font-paragraph text-sm text-green-600">Completed</span>
                            </div>
                          ))
                        ) : (
                          <p className="font-paragraph text-sm text-foreground/60 text-center py-8">
                            No appointment history yet
                          </p>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
