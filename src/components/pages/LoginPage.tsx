import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Zap, ArrowRight, Shield, Smartphone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useMember } from '@/integrations/members/providers/MemberContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const navigate = useNavigate();
  const { actions } = useMember();
  const [selectedRole, setSelectedRole] = useState<'user' | 'staff' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelect = (role: 'user' | 'staff') => {
    setSelectedRole(role);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store role in localStorage for session management
      localStorage.setItem('userRole', selectedRole || 'user');
      localStorage.setItem('userEmail', email);

      // Trigger global login
      actions.login();

      // Navigate based on role
      if (selectedRole === 'staff') {
        navigate('/generate-token');
      } else {
        navigate('/queue');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-[100rem] mx-auto px-6">
          {!selectedRole ? (
            // Role Selection Screen
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-16">
                <h1 className="font-heading text-5xl md:text-6xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Choose Your Role
                </h1>
                <p className="font-paragraph text-lg text-foreground/70">
                  Select how you want to use our queue management system
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* User Role Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleRoleSelect('user')}
                  className="cursor-pointer"
                >
                  <Card className="p-12 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-primary/20 hover:border-primary/50 transition-all h-full flex flex-col justify-between group">
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <Smartphone className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="font-heading text-3xl mb-4 text-foreground">Book a Token</h2>
                      <p className="font-paragraph text-lg text-foreground/70 mb-8">
                        Join the queue, get a digital token, and track your position in real-time from anywhere.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-foreground/60">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="font-paragraph text-sm">Instant token generation</span>
                        </li>
                        <li className="flex items-center gap-3 text-foreground/60">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="font-paragraph text-sm">Real-time queue tracking</span>
                        </li>
                        <li className="flex items-center gap-3 text-foreground/60">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="font-paragraph text-sm">SMS notifications</span>
                        </li>
                      </ul>
                      <Button className="w-full py-6 rounded-full bg-primary text-primary-foreground font-heading text-lg font-semibold hover:bg-primary/90 transition-colors group-hover:shadow-lg">
                        Continue as User <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>

                {/* Staff Role Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleRoleSelect('staff')}
                  className="cursor-pointer"
                >
                  <Card className="p-12 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-accent-teal/20 hover:border-accent-teal/50 transition-all h-full flex flex-col justify-between group">
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-accent-teal/10 flex items-center justify-center mb-6 group-hover:bg-accent-teal/20 transition-colors">
                        <Shield className="w-8 h-8 text-accent-teal" />
                      </div>
                      <h2 className="font-heading text-3xl mb-4 text-foreground">Generate Tokens</h2>
                      <p className="font-paragraph text-lg text-foreground/70 mb-8">
                        Manage the queue, generate tokens for customers, and monitor service operations.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-foreground/60">
                          <div className="w-2 h-2 rounded-full bg-accent-teal" />
                          <span className="font-paragraph text-sm">Generate customer tokens</span>
                        </li>
                        <li className="flex items-center gap-3 text-foreground/60">
                          <div className="w-2 h-2 rounded-full bg-accent-teal" />
                          <span className="font-paragraph text-sm">Queue management tools</span>
                        </li>
                        <li className="flex items-center gap-3 text-foreground/60">
                          <div className="w-2 h-2 rounded-full bg-accent-teal" />
                          <span className="font-paragraph text-sm">Service analytics</span>
                        </li>
                      </ul>
                      <Button className="w-full py-6 rounded-full bg-accent-teal text-primary-foreground font-heading text-lg font-semibold hover:bg-accent-teal/90 transition-colors group-hover:shadow-lg">
                        Continue as Staff <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </div>

              <div className="text-center mt-12">
                <p className="font-paragraph text-foreground/60">
                  Don't have an account? <Link to="/" className="text-primary font-semibold hover:underline">Go back home</Link>
                </p>
              </div>
            </motion.div>
          ) : (
            // Login Form Screen
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <Card className="p-12 bg-card-background backdrop-blur-sm">
                <div className="mb-8">
                  <button
                    onClick={handleBackToRoleSelection}
                    className="text-primary hover:text-primary/80 font-medium text-sm mb-6 flex items-center gap-2"
                  >
                    ← Back to Role Selection
                  </button>

                  <h2 className="font-heading text-3xl mb-2">
                    {selectedRole === 'staff' ? 'Staff Login' : 'User Login'}
                  </h2>
                  <p className="font-paragraph text-foreground/60">
                    {selectedRole === 'staff'
                      ? 'Sign in to manage the queue'
                      : 'Sign in to book your token'}
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <p className="font-paragraph text-sm text-red-700">{error}</p>
                  </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="font-paragraph text-sm mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="font-paragraph text-sm mb-2 block">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-heading text-lg font-semibold hover:scale-105 transition-transform"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-foreground/10">
                  <p className="font-paragraph text-sm text-foreground/60 text-center">
                    Demo credentials available upon request
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
