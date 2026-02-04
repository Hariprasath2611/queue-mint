import { motion } from 'framer-motion';
import { Info, Users, ShieldCheck, Zap } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Users,
      title: 'Queue Management',
      description: 'Effortlessly manage customer flows and reduce perceived wait times.'
    },
    {
      icon: Zap,
      title: 'Real-time Tracking',
      description: 'Get live updates on your position in the queue and estimated wait times.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Access',
      description: 'Protected data and streamlined login for all users.'
    }
  ];

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
          >
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">About SmartQueue</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            Revolutionizing the way you wait.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-foreground/70"
          >
            SmartQueue is a modern solution designed to eliminate the frustration of physical waiting lines.
          </motion.p>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 3) }}
              className="p-6 rounded-3xl bg-card border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </section>

        <section className="bg-gradient-to-br from-primary to-secondary rounded-[2rem] p-8 md:p-12 text-primary-foreground">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-heading font-bold">Our Mission</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              We empower organizations to deliver exceptional service by providing transparent, 
              real-time queue management tools that value people's time.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
