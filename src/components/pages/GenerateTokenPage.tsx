import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, AlertCircle, CheckCircle, Loader2, LogOut, Printer, Copy } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { QueueTokens, Departments } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function GenerateTokenPage() {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState<QueueTokens[]>([]);
  const [departments, setDepartments] = useState<Departments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [newToken, setNewToken] = useState<QueueTokens | null>(null);
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if user is logged in as staff
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');
    
    if (role !== 'staff') {
      navigate('/login');
      return;
    }
    
    setUserEmail(email || '');
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [navigate]);

  const loadData = async () => {
    const [tokensResult, deptResult] = await Promise.all([
      BaseCrudService.getAll<QueueTokens>('tokens', {}, { limit: 100 }),
      BaseCrudService.getAll<Departments>('departments', {}, { limit: 50 }),
    ]);
    
    const activeTokens = tokensResult.items
      .filter(t => t.isActive)
      .sort((a, b) => (a.queuePosition || 0) - (b.queuePosition || 0));
    
    setTokens(activeTokens);
    setDepartments(deptResult.items);
    setIsLoading(false);
  };

  const handleGenerateToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDepartment || !customerName || !customerPhone) return;

    setIsGenerating(true);

    const activeTokensInDept = tokens.filter(
      t => t.status === 'Waiting' && t.tokenNumber?.startsWith(selectedDepartment.substring(0, 3).toUpperCase())
    );
    
    const nextPosition = activeTokensInDept.length + 1;
    const tokenNumber = `${selectedDepartment.substring(0, 3).toUpperCase()}-${String(nextPosition).padStart(3, '0')}`;
    const estimatedWait = nextPosition * 15;

    const tokenData: QueueTokens = {
      _id: crypto.randomUUID(),
      tokenNumber,
      status: 'Waiting',
      queuePosition: nextPosition,
      estimatedWaitTime: estimatedWait,
      issuedAt: new Date().toISOString(),
      isActive: true,
    };

    await BaseCrudService.create('tokens', tokenData);
    setNewToken(tokenData);
    setShowSuccess(true);
    setCustomerName('');
    setCustomerPhone('');
    setSelectedDepartment('');
    setIsGenerating(false);
    loadData();

    setTimeout(() => {
      setShowSuccess(false);
      setNewToken(null);
    }, 8000);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTokenId(id);
    setTimeout(() => setCopiedTokenId(null), 2000);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Waiting':
        return 'text-primary';
      case 'In Progress':
        return 'text-accent-teal';
      case 'Completed':
        return 'text-green-600';
      default:
        return 'text-foreground/60';
    }
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
          {/* Header with Logout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex items-center justify-between"
          >
            <div>
              <h1 className="font-heading text-5xl md:text-6xl mb-4 bg-gradient-to-r from-accent-teal to-emerald-500 bg-clip-text text-transparent">
                Token Generation
              </h1>
              <p className="font-paragraph text-lg text-foreground/70">
                Staff Portal - Generate and manage customer tokens
              </p>
              {userEmail && (
                <p className="font-paragraph text-sm text-foreground/50 mt-2">
                  Logged in as: <span className="font-semibold">{userEmail}</span>
                </p>
              )}
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Token Generation Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <Card className="p-8 bg-card-background backdrop-blur-sm sticky top-24">
                <h2 className="font-heading text-2xl mb-6">Generate New Token</h2>
                
                {showSuccess && newToken && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-6 bg-green-50 border-2 border-green-500 rounded-2xl"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h3 className="font-heading text-lg text-green-900">Token Generated!</h3>
                    </div>
                    <p className="font-paragraph text-sm text-green-800 mb-2">
                      Token: <span className="font-bold text-xl">{newToken.tokenNumber}</span>
                    </p>
                    <p className="font-paragraph text-sm text-green-800">
                      Position: {newToken.queuePosition} | Wait: ~{newToken.estimatedWaitTime} min
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleGenerateToken} className="space-y-6">
                  <div>
                    <Label htmlFor="customer-name" className="font-paragraph text-sm mb-2 block">
                      Customer Name
                    </Label>
                    <Input
                      id="customer-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter customer name"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="customer-phone" className="font-paragraph text-sm mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      id="customer-phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Enter phone number"
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

                  <Button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full py-6 rounded-full bg-gradient-to-r from-accent-teal to-emerald-500 text-primary-foreground font-heading text-lg font-semibold hover:scale-105 transition-transform"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Token'
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Active Queue */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <Card className="p-8 bg-card-background backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl">Active Queue</h2>
                  <div className="flex items-center gap-2 text-accent-teal">
                    <Users className="w-5 h-5" />
                    <span className="font-heading text-lg">{tokens.length} Tokens</span>
                  </div>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {isLoading ? null : tokens.length > 0 ? (
                    tokens.map((token, index) => (
                      <motion.div
                        key={token._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-6 bg-white rounded-2xl shadow-sm border border-foreground/5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-teal to-emerald-500 flex items-center justify-center">
                              <span className="font-heading text-lg text-primary-foreground font-bold">
                                {token.queuePosition}
                              </span>
                            </div>
                            <div>
                              <p className="font-heading text-xl mb-1">{token.tokenNumber}</p>
                              <div className={`flex items-center gap-2 ${getStatusColor(token.status)}`}>
                                {getStatusIcon(token.status)}
                                <span className="font-paragraph text-sm">{token.status}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-paragraph text-sm text-foreground/60 mb-1">Est. Wait</p>
                            <p className="font-heading text-2xl text-accent-teal">
                              {token.estimatedWaitTime} min
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => copyToClipboard(token.tokenNumber || '', token._id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium"
                          >
                            <Copy className="w-4 h-4" />
                            {copiedTokenId === token._id ? 'Copied!' : 'Copy'}
                          </button>
                          <button
                            onClick={() => window.print()}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium"
                          >
                            <Printer className="w-4 h-4" />
                            Print
                          </button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-16">
                      <Users className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                      <p className="font-paragraph text-foreground/60">No active tokens in queue</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Queue Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-paragraph text-sm text-foreground/60">Total Active</p>
                  <p className="font-heading text-3xl font-bold text-foreground">{tokens.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-teal-50 to-emerald-50 border border-accent-teal/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-teal/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent-teal" />
                </div>
                <div>
                  <p className="font-paragraph text-sm text-foreground/60">Avg Wait Time</p>
                  <p className="font-heading text-3xl font-bold text-foreground">
                    {tokens.length > 0 
                      ? Math.round(tokens.reduce((sum, t) => sum + (t.estimatedWaitTime || 0), 0) / tokens.length)
                      : 0} min
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-paragraph text-sm text-foreground/60">Departments</p>
                  <p className="font-heading text-3xl font-bold text-foreground">{departments.length}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
