import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
  ];

  const isDark = location.pathname === '/' && !scrolled;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
      ? 'py-4 bg-white/80 backdrop-blur-2xl shadow-premium border-b border-primary/10' 
      : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Custom 3-Star Logo - 2 Small Left, 1 Big Right, Rotating, Viouler */}
        <Link to="/" className="flex items-center group">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl transition-all duration-500 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(124,102,185,0.2)]">
            <div className="flex flex-col items-end gap-1">
              <Sparkles className="w-2.5 h-2.5 text-viouler animate-float-fast opacity-40 group-hover:opacity-100 group-hover:text-white transition-all" />
              <Sparkles className="w-4 h-4 text-viouler animate-float-slow opacity-60 group-hover:opacity-100 group-hover:text-white transition-all" />
            </div>
            <motion.div
              animate={{ 
                filter: ["drop-shadow(0 0 5px rgba(124,102,185,0.3))", "drop-shadow(0 0 15px rgba(124,102,185,0.6))", "drop-shadow(0 0 5px rgba(124,102,185,0.3))"]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-10 h-10 text-viouler animate-spin-slow group-hover:text-white transition-all drop-shadow-lg" />
            </motion.div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link !transition-all duration-500 ${
                scrolled ? 'text-primary' : 'text-primary/90'
              } hover:!text-viouler`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
          <Link to="/booking" className={`btn-primary !py-2.5 !px-8 text-[10px] shadow-lg hover:shadow-primary/20 ${
            !scrolled && 'bg-primary text-white hover:bg-viouler'
          }`}>
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 rounded-xl bg-primary/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className={scrolled ? 'text-primary' : 'text-white'} /> : <Menu className={scrolled ? 'text-primary' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-primary/10 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-xl font-serif text-primary italic"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/booking" className="btn-primary text-center">Inquire Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
