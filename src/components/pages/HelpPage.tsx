import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { FrequentlyAskedQuestions } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function HelpPage() {
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    const { items } = await BaseCrudService.getAll<FrequentlyAskedQuestions>('faqs', {}, { limit: 100 });
    const sortedFaqs = items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    setFaqs(sortedFaqs);
    setIsLoading(false);
  };

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(faqs.map(faq => faq.category).filter(Boolean)));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-5xl md:text-6xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Help Center
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
              Find answers to common questions and learn how to use the Smart Queue System
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 rounded-full bg-card-background backdrop-blur-sm text-base"
              />
            </div>
          </motion.div>

          {/* Quick Guide Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 bg-card-background backdrop-blur-sm h-full">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4">
                  <span className="font-heading text-xl text-primary-foreground">1</span>
                </div>
                <h3 className="font-heading text-xl mb-3">Book a Token</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Visit the Queue page, select your department, fill in your details, and instantly receive your token number with queue position.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-8 bg-card-background backdrop-blur-sm h-full">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4">
                  <span className="font-heading text-xl text-primary-foreground">2</span>
                </div>
                <h3 className="font-heading text-xl mb-3">Schedule Appointment</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Go to Appointments page, choose your preferred date and time, select department, and confirm your booking.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-8 bg-card-background backdrop-blur-sm h-full">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4">
                  <span className="font-heading text-xl text-primary-foreground">3</span>
                </div>
                <h3 className="font-heading text-xl mb-3">Track Progress</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Use the Dashboard to monitor your active tokens, view upcoming appointments, and check your complete history.
                </p>
              </Card>
            </motion.div>
          </div>

          {/* FAQs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto min-h-[400px]"
          >
            <h2 className="font-heading text-3xl mb-8 text-center">Frequently Asked Questions</h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <LoadingSpinner />
              </div>
            ) : filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {categories.map((category) => {
                  const categoryFaqs = filteredFaqs.filter(faq => faq.category === category);
                  if (categoryFaqs.length === 0) return null;

                  return (
                    <div key={category}>
                      <h3 className="font-heading text-xl mb-4 text-accent-teal">{category}</h3>
                      <div className="space-y-3 mb-8">
                        {categoryFaqs.map((faq, index) => (
                          <motion.div
                            key={faq._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Card className="overflow-hidden bg-card-background backdrop-blur-sm">
                              <button
                                onClick={() => toggleFAQ(faq._id)}
                                className="w-full p-6 text-left flex items-center justify-between hover:bg-foreground/5 transition-colors"
                              >
                                <span className="font-heading text-lg pr-4">{faq.question}</span>
                                {expandedId === faq._id ? (
                                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-foreground/40 flex-shrink-0" />
                                )}
                              </button>
                              {expandedId === faq._id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="px-6 pb-6"
                                >
                                  <p className="font-paragraph text-foreground/70 leading-relaxed">
                                    {faq.answer}
                                  </p>
                                  {faq.lastUpdated && (
                                    <p className="font-paragraph text-xs text-foreground/50 mt-4">
                                      Last updated: {new Date(faq.lastUpdated).toLocaleDateString()}
                                    </p>
                                  )}
                                </motion.div>
                              )}
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <HelpCircle className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                <p className="font-paragraph text-foreground/60">
                  {searchQuery ? 'No results found for your search' : 'No FAQs available'}
                </p>
              </div>
            )}
          </motion.div>

          {/* Contact Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <Card className="p-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-center">
              <h2 className="font-heading text-3xl mb-4">Still Need Help?</h2>
              <p className="font-paragraph text-lg mb-8 opacity-90">
                Our support team is here to assist you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@smartqueue.com"
                  className="px-8 py-4 rounded-full bg-white text-primary font-heading text-base font-semibold hover:scale-105 transition-transform"
                >
                  Email Support
                </a>
                <a
                  href="tel:+15551234567"
                  className="px-8 py-4 rounded-full border-2 border-white text-white font-heading text-base font-semibold hover:scale-105 transition-transform"
                >
                  Call Us
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
