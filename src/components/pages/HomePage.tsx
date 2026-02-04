// HPI 1.7-G
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Clock, Users, Calendar, ArrowRight, ChevronRight, Activity, ShieldCheck, Smartphone, Zap } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { QueueTokens } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  // ---------------------------------------------------------------------------
  // DATA FIDELITY PROTOCOL: CANONICAL DATA SOURCES
  // ---------------------------------------------------------------------------
  const [activeTokens, setActiveTokens] = useState(0);
  const [avgWaitTime, setAvgWaitTime] = useState(0);

  useEffect(() => {
    loadQueueStats();
  }, []);

  const loadQueueStats = async () => {
    const { items } = await BaseCrudService.getAll<QueueTokens>('tokens', {}, { limit: 100 });
    const active = items.filter(t => t.isActive && t.status === 'Waiting');
    setActiveTokens(active.length);
    
    if (active.length > 0) {
      const totalWait = active.reduce((sum, t) => sum + (t.estimatedWaitTime || 0), 0);
      setAvgWaitTime(Math.round(totalWait / active.length));
    }
  };

  // ---------------------------------------------------------------------------
  // ANIMATION HOOKS & REFS
  // ---------------------------------------------------------------------------
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yHeroText = useTransform(heroScroll, [0, 1], [0, 200]);
  const opacityHero = useTransform(heroScroll, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background font-paragraph selection:bg-primary/20 selection:text-primary-foreground overflow-x-clip">
      <style>{`
        .aurora-bg {
          background: 
            radial-gradient(at 0% 0%, rgba(0, 198, 255, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(0, 229, 255, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(0, 168, 168, 0.1) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(0, 198, 255, 0.1) 0px, transparent 50%);
          filter: blur(40px);
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        .text-gradient {
          background: linear-gradient(135deg, #00C6FF 0%, #00E5FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
      `}</style>

      <Header />

      {/* ---------------------------------------------------------------------------
          HERO SECTION: IMMERSIVE & PARALLAX
      --------------------------------------------------------------------------- */}
      <section ref={heroRef} className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Dynamic Background */}
        <div className="absolute inset-0 aurora-bg z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 mix-blend-multiply" />
        
        {/* Floating Abstract Shapes */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl z-0"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-secondary/5 blur-3xl z-0"
        />

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            style={{ y: yHeroText, opacity: opacityHero }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/60 backdrop-blur-sm mb-8 shadow-sm"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-teal"></span>
              </span>
              <span className="text-sm font-medium text-foreground/70 tracking-wide uppercase">System Operational</span>
            </motion.div>

            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight mb-8 text-foreground">
              Smart <br />
              <span className="text-gradient">Queue System</span>
            </h1>
            
            <p className="font-paragraph text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-12">
              Experience the serenity of organized service. Book your token, schedule appointments, and reclaim your time with our intelligent queue management.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link to="/queue" className="group relative overflow-hidden rounded-full bg-foreground text-background px-10 py-5 font-heading font-medium text-lg transition-all hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10 flex items-center gap-3">
                  Get a Token <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <Link to="/appointments" className="group relative overflow-hidden rounded-full bg-white border border-foreground/10 px-10 py-5 font-heading font-medium text-lg text-foreground transition-all hover:bg-gray-50 hover:border-foreground/20">
                <span className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-accent-teal" /> Book Appointment
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Hero Visual / 3D Element Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative z-10 w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border border-white/40 glass-panel p-2">
                 <Image 
                  src="https://static.wixstatic.com/media/5283f4_55e1c2b38a0642789e807c28c5abfb32~mv2.png?originWidth=576&originHeight=576" 
                  alt="Smart Queue Interface Visualization" 
                  className="w-full h-full object-cover rounded-[2.5rem]"
                />
                
                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">System Status</p>
                    <p className="text-lg font-bold text-gray-900">Online</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------
          LIVE STATUS: STICKY & DATA-DRIVEN
      --------------------------------------------------------------------------- */}
      <section className="relative z-20 -mt-20 mb-32 px-6">
        <div className="max-w-[100rem] mx-auto">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass-panel rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200/60">
              {/* Metric 1 */}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="flex items-center gap-3 mb-2 text-accent-teal">
                  <Activity className="w-5 h-5" />
                  <span className="font-heading font-medium text-sm uppercase tracking-wider">Live Queue</span>
                </div>
                <div className="text-6xl md:text-7xl font-heading font-bold text-foreground tracking-tighter">
                  {activeTokens}
                </div>
                <p className="text-foreground/50 font-medium mt-2">Active Tokens</p>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="flex items-center gap-3 mb-2 text-primary">
                  <Clock className="w-5 h-5" />
                  <span className="font-heading font-medium text-sm uppercase tracking-wider">Est. Wait</span>
                </div>
                <div className="text-6xl md:text-7xl font-heading font-bold text-foreground tracking-tighter">
                  {avgWaitTime}<span className="text-3xl md:text-4xl align-top ml-1 text-foreground/40">m</span>
                </div>
                <p className="text-foreground/50 font-medium mt-2">Average Time</p>
              </div>

              {/* Metric 3 / CTA */}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="flex items-center gap-3 mb-2 text-secondary">
                  <Zap className="w-5 h-5" />
                  <span className="font-heading font-medium text-sm uppercase tracking-wider">Efficiency</span>
                </div>
                <div className="text-6xl md:text-7xl font-heading font-bold text-foreground tracking-tighter">
                  98<span className="text-3xl md:text-4xl align-top ml-1 text-foreground/40">%</span>
                </div>
                <p className="text-foreground/50 font-medium mt-2">Service Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------
          NARRATIVE SECTION: SPLIT LAYOUT
      --------------------------------------------------------------------------- */}
      <section className="w-full py-32 bg-white relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[2.5rem] transform -rotate-2" />
              <div className="relative rounded-[2rem] overflow-hidden h-[600px] shadow-2xl">
                <Image 
                  src="https://static.wixstatic.com/media/5283f4_20d354970c7843e08e42c3adfa7f2931~mv2.png?originWidth=960&originHeight=576" 
                  alt="Serene waiting area concept" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="font-heading text-2xl font-medium">Redefining the waiting experience.</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8 leading-tight">
                Time is your most <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-teal">valuable asset.</span>
              </h2>
              <p className="font-paragraph text-xl text-foreground/70 mb-8 leading-relaxed">
                Traditional waiting rooms are a thing of the past. Our intelligent system allows you to join the queue remotely, track your progress in real-time, and arrive exactly when you're needed.
              </p>
              
              <ul className="space-y-6 mb-10">
                {[
                  "Real-time position tracking via mobile",
                  "Instant SMS and email notifications",
                  "Seamless appointment integration"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-medium text-foreground/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------
          PROCESS SECTION: VERTICAL STICKY FLOW
      --------------------------------------------------------------------------- */}
      <section className="w-full py-32 bg-gray-50 relative">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-accent-teal font-bold tracking-widest uppercase text-sm mb-4 block">Workflow</span>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground">How It Works</h2>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sticky Visuals */}
            <div className="hidden lg:block lg:col-span-5 relative">
              <div className="sticky top-32 h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50">
                 <Image 
                  src="https://static.wixstatic.com/media/5283f4_301e5c5bf82d46a28ab952a087d23961~mv2.png?originWidth=448&originHeight=576" 
                  alt="App Interface Workflow" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
            </div>

            {/* Scrolling Steps */}
            <div className="lg:col-span-7 space-y-32 py-12">
              {[
                {
                  step: "01",
                  title: "Book Your Token",
                  desc: "Select your department and instantly receive a unique token number. No physical presence required.",
                  icon: <Smartphone className="w-8 h-8" />
                },
                {
                  step: "02",
                  title: "Track in Real-Time",
                  desc: "Watch your position move up the queue from the comfort of your home or a nearby cafe.",
                  icon: <Activity className="w-8 h-8" />
                },
                {
                  step: "03",
                  title: "Arrive & Serve",
                  desc: "Get notified when it's your turn. Walk in, show your digital token, and get served immediately.",
                  icon: <Users className="w-8 h-8" />
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-12 border-l-2 border-gray-200 hover:border-primary transition-colors duration-500"
                >
                  <div className="absolute -left-[25px] top-0 w-12 h-12 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center text-primary shadow-sm group-hover:border-primary transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-8xl font-heading font-bold text-gray-100 absolute -top-10 right-0 -z-10 select-none">
                    {item.step}
                  </span>
                  <h3 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-foreground">{item.title}</h3>
                  <p className="font-paragraph text-xl text-foreground/60 leading-relaxed max-w-xl">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------
          CORE ACTIONS: FULL BLEED CARDS
      --------------------------------------------------------------------------- */}
      <section className="w-full py-32 px-6 bg-white">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[600px]">
            
            {/* Card 1: Token */}
            <Link to="/queue" className="group relative rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 opacity-90 z-10 transition-opacity group-hover:opacity-100" />
              <Image 
                src="https://static.wixstatic.com/media/5283f4_afecca163b594c64831f9b470fe2bef6~mv2.png?originWidth=960&originHeight=576" 
                alt="Queue Token" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="relative z-20 h-full flex flex-col justify-between p-12 text-white">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-heading text-4xl md:text-5xl font-bold mb-4">Join Queue</h3>
                  <p className="text-white/80 text-lg max-w-md mb-8">Get a digital token instantly and skip the physical line.</p>
                  <span className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-blue-600 font-bold hover:bg-blue-50 transition-colors">
                    Get Token Now <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 2: Appointment */}
            <Link to="/appointments" className="group relative rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-500 opacity-90 z-10 transition-opacity group-hover:opacity-100" />
              <Image 
                src="https://static.wixstatic.com/media/5283f4_3d7ca8181fd347e0a5a13808e97d103a~mv2.png?originWidth=960&originHeight=576" 
                alt="Appointment Booking" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="relative z-20 h-full flex flex-col justify-between p-12 text-white">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                  <Calendar className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-heading text-4xl md:text-5xl font-bold mb-4">Book Appointment</h3>
                  <p className="text-white/80 text-lg max-w-md mb-8">Schedule a specific time slot for future visits.</p>
                  <span className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-teal-600 font-bold hover:bg-teal-50 transition-colors">
                    Schedule Visit <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------
          DASHBOARD TEASER
      --------------------------------------------------------------------------- */}
      <section className="w-full py-24 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent hidden lg:block" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Your Personal Command Center</h2>
                <p className="font-paragraph text-xl text-foreground/60 mb-10">
                  Access your history, view active tokens, and manage your appointments all from one secure dashboard.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/dashboard" className="px-8 py-4 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors">
                    Go to Dashboard
                  </Link>
                  <Link to="/help" className="px-8 py-4 rounded-full border border-gray-300 text-foreground font-medium hover:bg-gray-50 transition-colors">
                    Help Center
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <Activity className="w-8 h-8 text-primary mb-4" />
                    <div className="h-2 w-24 bg-gray-200 rounded mb-2" />
                    <div className="h-2 w-16 bg-gray-200 rounded" />
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-8">
                    <Clock className="w-8 h-8 text-secondary mb-4" />
                    <div className="h-2 w-24 bg-gray-200 rounded mb-2" />
                    <div className="h-2 w-16 bg-gray-200 rounded" />
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <Calendar className="w-8 h-8 text-accent-teal mb-4" />
                    <div className="h-2 w-24 bg-gray-200 rounded mb-2" />
                    <div className="h-2 w-16 bg-gray-200 rounded" />
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-8">
                    <Users className="w-8 h-8 text-blue-500 mb-4" />
                    <div className="h-2 w-24 bg-gray-200 rounded mb-2" />
                    <div className="h-2 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}