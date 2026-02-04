import { motion } from 'framer-motion';
import { Building2, Stethoscope, Landmark, GraduationCap, Briefcase } from 'lucide-react';

const mockDepartments = [
    {
        id: '1',
        name: 'Healthcare',
        description: 'Expert medical care and consultation services.',
        icon: Stethoscope,
        color: 'bg-blue-500/10 text-blue-500'
    },
    {
        id: '2',
        name: 'Banking',
        description: 'Secure and efficient financial services.',
        icon: Landmark,
        color: 'bg-green-500/10 text-green-500'
    },
    {
        id: '3',
        name: 'Education',
        description: 'Academic counseling and administrative support.',
        icon: GraduationCap,
        color: 'bg-purple-500/10 text-purple-500'
    },
    {
        id: '4',
        name: 'General Services',
        description: 'Standard municipal and public utilities.',
        icon: Building2,
        color: 'bg-orange-500/10 text-orange-500'
    },
    {
        id: '5',
        name: 'Corporate',
        description: 'Business inquiries and professional services.',
        icon: Briefcase,
        color: 'bg-indigo-500/10 text-indigo-500'
    }
];

export default function DepartmentsPage() {
    return (
        <div className="pt-24 pb-16 px-6">
            <div className="max-w-[100rem] mx-auto space-y-12">
                <section className="text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-heading font-bold"
                    >
                        Explore Departments
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground/70 max-w-2xl mx-auto"
                    >
                        Select a department to view available services and join the queue.
                    </motion.p>
                </section>

                <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mockDepartments.map((dept, index) => (
                        <motion.div
                            key={dept.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="group p-8 rounded-[2rem] bg-card border border-border hover:border-primary/50 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${dept.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <dept.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-heading font-bold mb-3">{dept.name}</h3>
                            <p className="text-foreground/70 leading-relaxed mb-6">
                                {dept.description}
                            </p>
                            <button className="w-full py-3 rounded-xl bg-foreground/5 hover:bg-primary hover:text-primary-foreground font-medium transition-colors">
                                View Services
                            </button>
                        </motion.div>
                    ))}
                </section>
            </div>
        </div>
    );
}
