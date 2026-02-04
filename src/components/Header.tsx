import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info, Building2, LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMember } from '@/integrations/members/providers/MemberContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { isAuthenticated, actions } = useMember();

  const navItems = [
    { path: '/', label: 'Home', icon: Home, show: 'always' },
    { path: '/about', label: 'About', icon: Info, show: 'always' },
    { path: '/login', label: 'Login', icon: LogIn, show: 'guest' },
    { path: '/dashboard', label: 'Detail', icon: LayoutDashboard, show: 'auth' },
    { path: '/departments', label: 'Departments', icon: Building2, show: 'auth' },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (item.show === 'always') return true;
    if (item.show === 'guest') return !isAuthenticated;
    if (item.show === 'auth') return isAuthenticated;
    return true;
  });

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card-background backdrop-blur-md shadow-sm">
      <div className="max-w-[100rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SmartQueue
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-paragraph text-base flex items-center gap-2 transition-colors ${isActive(item.path)
                      ? 'text-primary font-medium'
                      : 'text-foreground/70 hover:text-primary'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            {isAuthenticated && (
              <button
                onClick={() => actions.logout()}
                className="font-paragraph text-base flex items-center gap-2 text-foreground/70 hover:text-destructive transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {filteredNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive(item.path)
                          ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                          : 'text-foreground/70 hover:bg-foreground/5'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-paragraph text-base">{item.label}</span>
                    </Link>
                  );
                })}
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      actions.logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/70 hover:bg-destructive/5 hover:text-destructive transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-paragraph text-base">Logout</span>
                  </button>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
