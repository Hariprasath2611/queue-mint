import { Link } from 'react-router-dom';
import { Clock, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t border-foreground/10">
      <div className="max-w-[100rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SmartQueue
              </span>
            </div>
            <p className="font-paragraph text-sm text-foreground/70">
              Modern queue and appointment management system designed for efficiency and convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/queue" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Book Token
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Schedule Appointment
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link to="/help" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li className="font-paragraph text-sm text-foreground/70">Token Management</li>
              <li className="font-paragraph text-sm text-foreground/70">Appointment Booking</li>
              <li className="font-paragraph text-sm text-foreground/70">Real-time Tracking</li>
              <li className="font-paragraph text-sm text-foreground/70">Queue Analytics</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="font-paragraph text-sm text-foreground/70">support@smartqueue.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-paragraph text-sm text-foreground/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-paragraph text-sm text-foreground/70">123 Service Center, City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-paragraph text-sm text-foreground/60">
            © 2026 SmartQueue. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/help#privacy" className="font-paragraph text-sm text-foreground/60 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/help#terms" className="font-paragraph text-sm text-foreground/60 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
